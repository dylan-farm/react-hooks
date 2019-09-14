/** @format */

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  root: true,
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@router', './src/router'],
          ['@components', './src/components'],
          ['@pages', './src/pages/'],
          ['@config', './src/config/'],
          ['@assets', './src/assets/'],
          ['@models', './src/models/'],
          ['@utils', './src/utils/'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'warn',

    /* 语法问题 */

    // 禁止使用console
    'no-console': 'warn',
    'no-debugger': 'warn',
    // 类的实例方法可以不用this
    'class-methods-use-this': 'off',
    // 考虑到 语义性 和 可扩展行 方面，允许 if 作为唯一语句出现在 else 代码块中
    'no-lonely-if': 'off',
    // 考虑到允许对 语义性 和 简化代码逻辑思考 带来的好处，允许在 esle 前有 return
    'no-else-return': 'off',
    // 考虑到 for 循环的编码习惯，以及在 for 循环末尾使用 ++ 不会产生空格带来的语义性问题，故允许
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // 要求 import/first, 但是不要求绝对路径的依赖位于前方（关闭'absolute-first'）
    'import/first': 'error',
    // 有时确实需要在循环中写 await
    'no-await-in-loop': 'off',
    // 还是会用到 hasOwnProperty
    'no-prototype-builtins': 'off',
    // 考虑到某些时候确实没有 default case, 强制写也是冗余
    'default-case': 'warn',
    // foo == null 用于判断 foo 不是 undefined 并且不是 null，比较常用，故允许此写法
    'no-eq-null': 'off',
    // 考虑到 按需加载功能，关闭全局 require 要求
    'global-require': 'off',
    // 参数重新赋值有些是逻辑正常需求
    'no-param-reassign': 'off',
    // case 中可能会进行一些逻辑处理，声明写临时变量
    'no-case-declarations': 'off',
    // 要求过于严格
    'prefer-destructuring': 'off',
    //
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],

    /* 代码风格问题 */

    // 标识符允许使用下划线
    'no-underscore-dangle': 'off',
    // 使用4个空格缩进
    indent: ['error', 2, { SwitchCase: 1 }],
    // 考虑到大数量的数组的书写需要，允许一行包含多个元素
    'array-element-newline': 'off',
    // 函数内条件的数量
    complexity: ['off', 10],
    // 函数最多可包含表达式的数量
    'max-statements': ['off', 50],
    // 最大语句嵌套的深度
    'max-depth': ['off', 5],
    // 最大函数嵌套的深度
    'max-nested-callbacks': ['off', 3],
    // 函数参数最大数量
    'max-params': ['off', 5],
    // 行最大长度
    'max-len': ['off', 120, 4],
    // 文件行数需要根据实际情况考量
    'max-lines': 'off',
    // 没必要限制函数必须有名字
    'func-names': 'off',
    // 链式调用没必要强制换行
    'newline-per-chained-call': 'off',

    /* import 语法 */

    'import/no-unresolved': ['warn', { commonjs: false }],
    'import/no-webpack-loader-syntax': 'off', //关闭import 里面 ！检测
    'import/prefer-default-export': 'off',

    /* React/jsx 语法 */

    // jsx 使用 2 空格缩进
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    // 使用 jsx-indent 限制即可
    'react/jsx-closing-tag-location': 'off',
    // 优化显示
    'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
    // propTypes 不需要限制的这么严格
    'react/forbid-prop-types': 'off',
    // 考虑到可读性、跨工程协作开发效率，最终开启为 airbnb 标准规范
    // 'react/sort-comp': 'off',
    // 存在部分数据确实没有 key，只能使用 索引 作为key，故调整为 warn，提示开发者注意
    'react/no-array-index-key': 'warn',
    // 部分场景下，需要进行参数绑定
    'react/jsx-no-bind': 'warn',
    // 考虑到版本兼容性 -> 兼容问题在工程中处理
    // 'react/prefer-stateless-function': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    // 根据实际情况判断使用即可
    'react/jsx-no-target-blank': 'off',
    // 在某些组件化方案中，id的设置可能是无效的，具体看情况使用即可（此规则即将被废弃）
    'jsx-a11y/label-has-for': 'off',
    // 集合内的标签都需要有alt属性，对aria很有意义，但是实践上，暂时不太会用到
    'jsx-a11y/alt-text': 'off',
    // 所有静态标签都不能添加事件，语义上很有意义，但是实践中一般为了减少标签数量，还是会添加事件
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/jsx-props-no-spreading': [2, { custom: 'ignore' }],

    /* 推荐在旧项目中关闭的规则（修改成本较高，且涉及代码逻辑，修复容易出问题）*/

    'prefer-template': 'off',
    'prefer-destructuring': 'off',
    'react/jsx-filename-extension': 'off', // 修改文件名涉及引用检查
    'react/prefer-stateless-function': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'error',
  },
};
