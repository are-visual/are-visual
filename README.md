## are-visual 🚧

A simple React UI library.



### Scripts

```bash
pnpm build

# OR

pnpm build --package <name>
```



### buildOptions

若 package 有特殊的编译需求，则支持在 package.json 中配置字段 `buildOptions`，支持以下配置：

#### entry
  编译时的入口文件。

  ```json
  {
    "buildOptions": {
      "entry": "./index.ts"
    }
  }
  ```

  

#### cmd
 自定义编译命令，此命令需要在 `scripts` 中存在。

  ```json
  {
    "scripts": {
      "build": "node scripts/build.js"
    },
    "buildOptions": {
      "cmd": "build"
    }
  }
  ```

  
