// import ReactDOM from "react-dom";
// ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById("root"));

interface IKeyValue {
  [key: string]: string;
}
class MockStorage implements Storage {
  public length = 0;
  private elements: IKeyValue = {};

  public clear() {
    this.elements = {};
  }
  public getItem(key: string) {
    return this.elements[key];
  }
  public setItem(key: string, value: string) {
    this.elements[key] = value;
    return true;
  }
  public removeItem(key: string) {
    return Reflect.deleteProperty(this.elements, key);
  }
  public key(index: number) {
    const keys = Object.getOwnPropertyNames(this.elements);
    return this.elements[keys[index]];
  }
}
