// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:8068",
  data:{
    "files": [
      {
        "id": 1673351756806,
        "name": "test file",
        "created_at": "10-01-2023",
        "tag": "",
        "content": "```typescript\nlet array = [\n    {\n        id : 1,\n        group : 'Juices',\n        items : [\n            { name : 'Apple',   price : 1.4 },\n            { name : 'Orange',  price : 1.7 }\n        ]\n    }\n];\n```",
        "id_folder": 0
      }
    ],
    "folders": [
      {
        "id": 1673284460845,
        "name": "folder A",
        "files": []
      },
      {
        "id": 4,
        "name": "folder B",
        "files": [
          {
            "id": 8,
            "name": "file 1 B",
            "created_at": "08-01-2023",
            "tag": "A",
            "content": "```typescript\nlet array = [\n    {\n        id : 1,\n        group : 'Juices',\n        items : [\n            { name : 'Apple',   price : 1.4 },\n            { name : 'Orange',  price : 1.7 }\n        ]\n    }\n];\n```",
            "id_folder": 0
          }
        ]
      },
      {
        "id": 1,
        "name": "folder C",
        "files": [
          {
            "id": 5,
            "name": "file 1 C",
            "created_at": "08-01-2023",
            "tag": "A",
            "content": "```typescript\nlet array = [\n    {\n        id : 1,\n        group : 'Juices',\n        items : [\n            { name : 'Apple',   price : 1.4 },\n            { name : 'Orange',  price : 1.7 }\n        ]\n    }\n];\n```",
            "id_folder": 2
          },
          {
            "id": 1673349367428,
            "name": "file 2 C",
            "created_at": "10-01-2023",
            "tag": "",
            "content": "```typescript\nlet array = [\n    {\n        id : 1,\n        group : 'Juices',\n        items : [\n            { name : 'Apple',   price : 1.4 },\n            { name : 'Orange',  price : 1.7 }\n        ]\n    }\n];\n```",
            "id_folder": 0
          }
        ]
      }
    ]
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
