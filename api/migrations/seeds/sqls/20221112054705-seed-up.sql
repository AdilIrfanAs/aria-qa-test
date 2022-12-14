CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_validated` int(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `USER_ID_UNIQUE` (`id`),
  UNIQUE KEY `USER_EMAIL_UNIQUE` (`email`),
  KEY `USER_DELETED_AT_IDX` (`deleted_at`)
);

CREATE TABLE IF NOT EXISTS `issue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `score` decimal(14, 4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ISSUE_ID_UNIQUE` (`id`),
  KEY `ISSUE_DELETED_AT_IDX` (`deleted_at`)
);

REPLACE INTO `dashboardapi`.issue (
  id,
  name,
  description,
  score,
  created_at,
  updated_at,
  deleted_at
)
VALUES
  (
    1,
    'CVE-2022-38650',
    'A remote unauthenticated insecure deserialization vulnerability exists in VMware Hyperic Server 5.8.6. Exploitation of this vulnerability enables a malicious party to run arbitrary code or malware within Hyperic Server',
    78.0000,
    '2022-11-12 05:00:00',
    '2022-11-12 14:00:57',
    NULL
  ),
  (
    2,
    'CVE-2022-26028',
    'Uncontrolled search path in the Intel(R) VTune(TM) Profiler software before version 2022.2.0 may allow an authenticated user to potentially enable escalation of privilege via local access.',
    54.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:01:51',
    NULL
  ),
  (
    3,
    'CVE-2022-32156',
    'In Splunk Enterprise and Universal Forwarder versions before 9.0, the Splunk command-line interface (CLI) did not validate TLS certificates while connecting to a remote Splunk platform instance by default. After updating to version 9.0, see Configure',
    54.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:02:12',
    NULL
  ),
  (
    4,
    'CVE-2022-32569',
    'Improper buffer restrictions in BIOS firmware for some Intel(R) NUC M15 Laptop Kits before version BCTGL357.0074 may allow a privileged user to potentially enable escalation of privilege via local access.',
    89.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:02:55',
    NULL
  ),
  (
    5,
    'CVE-2022-30548',
    'Uncontrolled search path element in the Intel(R) Glorp software may allow an authenticated user to potentially enable escalation of privilege via local access.',
    89.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:03:11',
    NULL
  ),
  (
    6,
    'CVE-2022-33973',
    'Improper access control in the Intel(R) WAPI Security software for Windows 10/11 before version 22.2150.0.1 may allow an authenticated user to potentially enable information disclosure via local access.',
    65.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:03:31',
    NULL
  ),
  (
    7,
    'CVE-2022-30297',
    'Cross-site scripting in the Intel(R) EMA software before version 1.8.0 may allow a privileged user to potentially enable escalation of privilege via local access.',
    98.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:03:48',
    NULL
  ),
  (
    8,
    'CVE-2022-30297',
    'Missing release of memory after effective lifetime in firmware for Intel(R) SPS before versions SPS_E3_06.00.03.035.0 may allow a privileged user to potentially enable denial of service via local access.',
    33.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:04:06',
    NULL
  ),
  (
    9,
    'CVE-2022-29486',
    'Improper buffer restrictions in the Hyperscan library maintained by Intel(R) all versions downloaded before 04/29/2022 may allow an unauthenticated user to potentially enable escalation of privilege via network access.',
    47.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:04:24',
    NULL
  ),
  (
    10,
    'CVE-2022-41113',
    'Windows Win32 Kernel Subsystem Elevation of Privilege Vulnerability.',
    23.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:05:22',
    NULL
  );

REPLACE INTO `dashboardapi`.issue (
  id,
  name,
  description,
  score,
  created_at,
  updated_at,
  deleted_at
)
VALUES
  (
    11,
    'CVE-2022-44244',
    'An authentication bypass in Lin-CMS v0.2.1 allows attackers to escalate privileges to Super Administrator.',
    84.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    12,
    'CVE-2022-44548',
    'There is a vulnerability in permission verification during the Bluetooth pairing process. Successful exploitation of this vulnerability may cause the dialog box for confirming the pairing not to be displayed during Bluetooth pairing.',
    56.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    13,
    'CVE-2022-32605',
    'In isp, there is a possible out of bounds write due to an incorrect bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07213898; Issue',
    99.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    14,
    'CVE-2022-32607',
    'In aee, there is a possible use after free due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07202891; Issue ID: ALP',
    76.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    15,
    'CVE-2021-41771',
    'Multiple W&T products of the Comserver Series use a small number space for allocating sessions ids. An unathenticated remote attacker can brute force the session id and gets access to an account on the the device.',
    97.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    16,
    'CVE-2021-24543',
    'HashiCorp Nomad and Nomad Enterprise 1.4.0 up to 1.4.1 workload identity token can list non-sensitive metadata for paths under nomad/ that belong to other jobs in the same namespace. Fixed in 1.4.2.',
    91.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    17,
    'CVE-2022-26520',
    'Plesk Obsidian allows a CSRF attack, e.g., via the /api/v2/cli/commands REST API to change an Admin password. NOTE: Obsidian is a specific version of the Plesk product: version numbers were used through version 12, and then the convention was changed',
    55.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    18,
    '	CVE-2021-24685',
    'SAP BusinessObjects BI LaunchPad - versions 420, 430, is susceptible to script execution attack by an unauthenticated attacker due to improper sanitization of the user inputs while interacting on the network. On successful exploitation, an attacker c',
    87.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    19,
    'CVE-2022-24714',
    'The AMS module has a vulnerability of serialization/deserialization mismatch. Successful exploitation of this vulnerability may cause privilege escalation.',
    65.0000,
    '2022-11-11 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    20,
    'CVE-2021-24730',
    'Generex CS141 through 2.10 allows remote command execution by administrators via a web interface that reaches run_update in /usr/bin/gxserve-update.sh (e.g., command execution can occur via a reverse shell installed by install.sh).',
    87.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  );

REPLACE INTO `dashboardapi`.issue (
  id,
  name,
  description,
  score,
  created_at,
  updated_at,
  deleted_at
)
VALUES
  (
    21,
    'CVE-2022-28805',
    'The preset launcher module has a permission verification vulnerability. Successful exploitation of this vulnerability makes unauthorized apps add arbitrary widgets and shortcuts without interaction.',
    66.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    22,
    'CVE-2022-24921',
    'Insufficient access controls in the AMD Link Android app may potentially result in information disclosure.',
    83.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    23,
    '	CVE-2022-3463',
    'A type confusion issue was addressed with improved state handling. This issue is fixed in watchOS 8.7, tvOS 15.6, iOS 15.6 and iPadOS 15.6, macOS Monterey 12.5. An app may be able to execute arbitrary code with kernel privileges.',
    73.0000,
    '2022-11-10 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    24,
    'CVE-2022-2711',
    'The AMS module has a vulnerability of serialization/deserialization mismatch. Successful exploitation of this vulnerability may cause privilege escalation.',
    70.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    25,
    '	CVE-2022-24715',
    'Insufficient verification of missing size check in ''LoadModule'' may lead to an out-of-bounds write potentially allowing an attacker with privileges to gain code execution of the OS/kernel by loading a malicious TA.',
    60.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    26,
    '	CVE-2022-25169',
    'The Simple Download Monitor WordPress plugin before 3.9.6 saves logs in a predictable location, and does not have any authentication or authorisation in place to prevent unauthenticated users to download and read the logs containing Sensitive Informa',
    54.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    27,
    'CVE-2022-45060',
    'A carefully crafted plugin link invocation could trigger an XSS vulnerability on Apache JSPWiki, related to the Denounce plugin, which could allow the attacker to execute javascript in the victim''s browser and get some sensitive information about the',
    87.0000,
    '2022-11-12 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    28,
    'CVE-2022-31199',
    'The jQuery Reply to Comment WordPress plugin through 1.31 does not have any CSRF check when saving its settings, nor sanitise or escape its ''Quote String'' and ''Reply String'' settings before outputting them in Comments, leading to a Stored Cross-Site',
    84.0000,
    '2022-11-10 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  ),
  (
    29,
    'CVE-2022-1391',
    'Due to lack of proper memory management, when a victim opens manipulated file received from untrusted sources in SAP 3D Visual Enterprise Author and SAP 3D Visual Enterprise Viewer, Arbitrary Code Execution can be triggered when payload forces:Re-use',
    84.0000,
    '2022-11-10 00:00:00',
    '2022-11-12 14:05:43',
    NULL
  );

REPLACE INTO `dashboardapi`.migrations (id, name, run_on)
VALUES
  (
    1,
    '/20221112054558-user-table',
    '2022-11-12 20:49:42'
  ),
  (
    2,
    '/20221112054605-issue-table',
    '2022-11-12 20:49:42'
  );

REPLACE INTO `dashboardapi`.`user` (
  id,
  email,
  name,
  password,
  is_validated,
  created_at,
  updated_at,
  deleted_at
)
VALUES
  (
    1,
    'admin@admin.com',
    'admin',
    'ec2604ee1799d3011a8405369e13dfbdcbf59c91b124dc9d0ab4990a1bbf7826ee4747b447ae2040d2e346f2317c20855b69c5ad883d16099c2a0e380216770d.9175ca4d6dc8ca8a',
    0,
    '2022-11-12 13:57:30',
    '2022-11-12 13:57:30',
    NULL
  );