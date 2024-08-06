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
  🌐 Criteria from URL
</h1>

<p align="center">
    <a href="https://github.com/CodelyTV"><img src="https://img.shields.io/badge/Codely-OS-green.svg?style=flat-square" alt="codely.com"/></a>
</p>

## 📥 Installation

```sh
npm i @codelytv/criteria-from-url
```

## 💻 Usage

The criteria converter expect an url with the following format:
* `filters`: An array of filters. Composed by:
    - `field`: The field to filter by.
    - `operator`: The operator to apply. [You can see here](https://github.com/CodelyTV/php-criteria/tree/main/packages/criteria) the valid operators list.
    - `value`: The value to filter by.
* `orderBy`: The field to order by.
* `order`: The order to apply. `asc` or `desc`.
* `pageSize`: The number of items per page.
* `pageNumber`: The page number.

### Url examples
Url with one filter and no order or pagination:
```
http://localhost:3000/api/users?filters[0][field]=name&filters[0][operator]=CONTAINS&filters[0][value]=Javi
```

Url with two filter, order and pagination:
```
http://localhost:3000/api/users
     ?filters[0][field]=name&filters[0][operator]=CONTAINS&filters[0][value]=Javi
     &filters[1][field]=email&filters[1][operator]=CONTAINS&filters[1][value]=gmail
     &orderBy=name
     &order=asc
     &pageSize=10
     &pageNumber=2
```
