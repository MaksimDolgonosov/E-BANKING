export function shortName(name: string | null): string {
  if (typeof name === "string") {
    const arr = name.split(" ");
    console.log(arr);
    return [...arr[0], " ", arr[1][0]].join("") + ".";
  } else {
    return "Неизвестен";
  }
}
