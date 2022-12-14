import 'dotenv/config';

import { Injectable } from '@nestjs/common';

import { existsSync, readFileSync } from 'fs';

import { parse } from 'dotenv';

import { ConfigSchema } from './config.schema';
import { Env, EnvKeys } from './config.types';

@Injectable()
export class ConfigService {
  private readonly env: Env;

  constructor(filePath?: string) {
    let env = process.env as Env;

    if (filePath) {
      env = this.getEnvFromPath(filePath);
    }

    this.env = this.validate(env);
  }

  public get(key: EnvKeys, defaultValue?: any): string {
    return this.env[key] || defaultValue;
  }

  public setEnvKey(k: EnvKeys, value: string) {
    this.env[k] = value;
  }

  private getEnvFromPath(filePath: string): Env {
    if (!existsSync(filePath)) {
      throw new Error('The file path provided does not exist.');
    }

    const envFile = readFileSync(filePath);
    const envFromPath = parse(envFile) as Env;

    return envFromPath;
  }

  private validate(env: Env): Env {
    const { error } = ConfigSchema.validate(env);

    if (error) {
      throw error;
    }

    return env;
  }
}
