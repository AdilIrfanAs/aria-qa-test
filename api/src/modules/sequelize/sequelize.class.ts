import {
  Column,
  CreatedAt,
  DeletedAt,
  DataType,
  Model,
  UpdatedAt,
} from 'sequelize-typescript';
import { FindAndCountOptions, FindOptions, Transaction } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

import {
  FindAndPaginateResult,
  PaginationMeta,
  PaginationOptions,
} from 'src/common/interface/pagination';

import { Repository } from './sequelize.interface';
import { NonAbstractTypeOfModel } from './sequelize.type';

export class BaseModel<T extends Model<T>> extends Model<T> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date | null;

  @DeletedAt
  deleted_at: Date | null;
}

export class BaseRepository<T extends Model<T>> implements Repository<T> {
  constructor(public readonly Model: NonAbstractTypeOfModel<T>) {}

  protected getFinalData(raw: boolean, data: null | T | T[]) {
    if (!data) return null;

    if (raw) {
      return !Array.isArray(data)
        ? (data.toJSON() as T)
        : (data.map((item) => item.toJSON()) as T[]);
    }

    return data;
  }

  protected getPagingMeta(
    page_size: number,
    count: number,
    page: number,
  ): PaginationMeta {
    return {
      page_size,
      page: page <= 0 ? 1 : page,
      page_count: Math.ceil(count / Number(page_size)),
      total_count: count,
    };
  }

  protected getPagination(
    page?: number,
    page_size?: number,
  ): { limit: number; offset: number } {
    const limit = page_size ? page_size : 10;
    const offset = !page || page <= 0 ? 0 : (page - 1) * limit;

    return { limit, offset };
  }

  protected getPagingData(
    rows: T[],
    count: number,
    options: FindAndCountOptions<T> & PaginationOptions,
  ): FindAndPaginateResult<T> {
    const { page = 1, page_size = 10 } = options;
    return {
      data: this.getFinalData(!!options.raw, rows) as T[],
      meta: this.getPagingMeta(page_size, count, page),
    };
  }

  public async findOne(options: FindOptions<T>): Promise<T | null> {
    const { raw = true, ...otherOptions } = options;

    const data = await this.Model.findOne(otherOptions);

    return this.getFinalData(raw, data) as T | null;
  }

  public create(values: Partial<T>, transaction?: Transaction): Promise<T> {
    return this.Model.create(
      values as MakeNullishOptional<T['_creationAttributes']>,
      { transaction },
    );
  }

  async paginate(
    options: FindAndCountOptions<T> & PaginationOptions,
  ): Promise<FindAndPaginateResult<T>> {
    const {
      page,
      page_size,
      order_by = 'created_at',
      sort_by = 'ASC',
      distinct,
      ...otherOptions
    } = options;
    const { limit, offset } = this.getPagination(page, page_size);

    const { rows, count } = await this.Model.findAndCountAll({
      ...otherOptions,
      limit,
      offset,
      order: options.order || [[order_by, sort_by]],
      distinct,
    });

    return this.getPagingData(rows, count, options);
  }
}
