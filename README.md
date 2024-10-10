<p align="center">
  <a href="https://codely.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://codely.com/logo/codely_logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://codely.com/logo/codely_logo-light.svg">
      <img alt="Codely logo" src="https://codely.com/logo/codely_logo.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  🎼 Criteria for JavaScript & TypeScript
</h1>

<p align="center">
    <a href="https://github.com/CodelyTV"><img src="https://img.shields.io/badge/Codely-OS-green.svg?style=flat-square" alt="Codely Open Source projects"/></a>
    <a href="https://pro.codely.com"><img src="https://img.shields.io/badge/Codely-Pro-black.svg?style=flat-square" alt="Codely Pro courses"/></a>
</p>

## 📥 Installation

To install the base criteria dependency, run the following command:
```sh
npm i @codelytv/criteria
```

Then, install the preferred criteria transformer. You can transform in two directions:

Create a Criteria from:
- [Next.js Request](./packages/criteria-from-next-request)
- [URL](./packages/criteria-from-url)

Convert a Criteria to:
- [Elasticsearch (and esql)](./packages/criteria-to-elasticsearch)
- [MySql](./packages/criteria-to-mysql)

You can also create your custom transformer.

### ✅ Testing
To facilitate the testing of the criteria, you can use the provided [object mothers](https://www.martinfowler.com/bliki/ObjectMother.html):

```sh
npm i @codelytv/criteria-test-mother --save-dev
```

## ➕ Other implementations
We have [another implementation in PHP](https://github.com/CodelyTV/php-criteria) with converters for Laravel and Symfony. 🙌

## 🚀 Release

1. At the end of each Pull Request, execute `pnpm changeset` to add the changes to the changelog.
2. Push the changes.
3. When the Pull Request is merged, a new release will be triggered, affecting only the modified packages.

If you want to merge a code without a changeset (for example, a Readme or test modification) you should execute
`pnpm changeset --empty` in your Pull Request before merging it.
