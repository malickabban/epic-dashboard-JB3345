import ListGroup from "./components/ListGroup";
import TextBox from "./components/TextBox";

function App() {
  let items = ["Patient 1", "Patient 2", "Patient 3"];
  let heading = "Patients";

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading={heading}
        onSelectItem={handleSelectItem}
      />
      <TextBox
      label=""
      name="username-textbox"
      placeholder="Username"
      ></TextBox>
      <TextBox
      label=""
      name="password-textbox"
      placeholder="Password"
      ></TextBox>
    </div>
  );
}

export default App;
