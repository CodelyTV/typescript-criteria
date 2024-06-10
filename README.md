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
    <a href="https://github.com/CodelyTV"><img src="https://img.shields.io/badge/Codely-OS-green.svg?style=flat-square" alt="codely.com"/></a>
</p>

## 📥 Installation

To install the base criteria dependency, run the following command:
```sh
npm i @codely/criteria
```

Then, install the preferred criteria transformer:
- [Elasticsearch (and esql)](./packages/criteria-elasticsearch)
- [MySql](./packages/criteria-mysql)

You can also create your custom transformer.

## 💻 Usage

## 🚀 Release

At the end of every Pull Request you should execute `pnpm changeset` in order to add the changes to the changelog.
This will control the versioning and then will release the package.

## ✅ Testing
To facilitate testing of the criteria, you can use the provided [object mothers](https://www.martinfowler.com/bliki/ObjectMother.html):

```sh
npm i @codely/criteria-mother -D
```
