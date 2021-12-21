```ts
setArticles((prev) => {
  const newArticlesNoDuplicates = newArticles.filter(
    (article) => !prev.some((prevArticle) => prevArticle.guid === article.guid)
  );
  return [...prev, ...newArticlesNoDuplicates];
});
```

```ts
var element;

const predicate = (value: any) => {
  element.guid === value.guid
}

const hasDuplicate = (element: any, arr: any[]): boolean => {
  return arr.some(value => value.guid === element.guid)
}

setArticles((prev) => {
  const newArticlesNoDuplicates = newArticles.filter(
    !hasDuplicate
  );
  return [...prev, ...newArticlesNoDuplicates];
});
```


```ts
function some(
  predicate: (param: any) => boolean;
): boolean {
  const arr = this.array;

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    if (predicate(element)) {
      return true;
    }
  }

  return false;
}
```

```ts
function filter(
  predicate: (param: any) => boolean;
): any[] {
  const arr = this.array;
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    if (predicate(element)) {
      newArr.push(element)
    }

  }
  return newArr;
}
```