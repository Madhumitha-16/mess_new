import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useState ,useEffect} from "react";
import './purchase.css';

export default function Purchase() {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(2);
  const [data,setData]=useState("");
  const[category,setCategory]=useState("");
  const[vendor,setVendor]=useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/purchase/getItems")
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
  }, []);

  
  const totAmount = (e) => {
    const val=e.target.id;
    const quantity=document.getElementById("quantity").value;
    console.log(val,quantity);
  };

  const getCategory=async(e)=>{
    let id=e.target.value;
    console.log(id);
    let item=document.getElementById("item").value;
    // let category=document.getElementById("category");
    let vendor=document.getElementById("vendor");
    axios
      .post("http://localhost:5000/purchase/getCategoryVendor", {
        item:item,
      })
      .then(function (response) {
        console.log(response.data[0]);
        setData(response.data[0]);
        // setCategory(response.data[0].category);
        console.log(category);
        // vendor.value=response.data[0].vendorName;
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(data);
  }

  const submit = () => {
    let arr = [];
    let date = document.getElementById("date").value;

    class Obj {
      constructor(item, currentQuantity,rmk,rmd,rmkcet) {
        this.ItemName = item;
        this.CurrentQuantity = currentQuantity;
        this.RMK = rmk;
        this.RMD = rmd;
        this.RMKCET = rmkcet;
        this.DATE = date;
      }
    }

    for (let i = 1; i < counter; i++) {
      let item = document.getElementById(i).value;
      let currentQuantity = document.getElementById(i + " currquantity").value;
      let rmk = document.getElementById(i + " RMK").value;
      let rmd = document.getElementById(i + " RMD").value;
      let rmkcet = document.getElementById(i + " RMKCET").value;
      let obj = new Obj(item, currentQuantity,rmk,rmd,rmkcet);
      arr.push(obj);
    }

    
    console.log(arr);

  };

  const generateRows = () => {
    let n=document.getElementById("num").value;
  for(let i=1;i<=n;i++){
  let x = document.getElementById("table");
    let row = x.insertRow();

    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();
    let cell6 = row.insertCell();
    let cell7 = row.insertCell();

    //select

    const select = document.createElement("Select");
    select.setAttribute("class", "form-select");
    const option = document.createElement("option");
    const optionText = document.createTextNode("Select");
    option.appendChild(optionText);
    option.setAttribute("value", "select");
    select.setAttribute("id", counter);

    select.appendChild(option);

    for (let i = 1; i < items.length; i++) {
      const option = document.createElement("option");
      const optionText = document.createTextNode(items[i].item);
      option.appendChild(optionText);
      option.setAttribute("value", items[i].item);
      select.appendChild(option);
    }

    cell2.appendChild(select);

    // totquantity

    let input1 = document.createElement("input");
    input1.setAttribute("type", "number");
    input1.setAttribute("placeholder", "Category");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("id", counter + " totquantity");
    input1.disabled = true;

    cell3.appendChild(input1);

    //current Quantity

    let input2 = document.createElement("input");
    input2.setAttribute("type", "number");
    input2.setAttribute("placeholder", "Vendor");
    input2.setAttribute("class", "form-control");
    input2.setAttribute("id", counter + " currquantity");
    input2.disabled = true;

    cell4.appendChild(input2);

    //RMK

    let input3 = document.createElement("input");
    input3.setAttribute("type", "number");
    input3.setAttribute("placeholder", "Quantity");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("id", counter + " RMK");
  

    cell5.appendChild(input3);

    //RMD

    let input4 = document.createElement("input");
    input4.setAttribute("type", "number");
    input4.setAttribute("placeholder", "Amount");
    input4.setAttribute("class", "form-control");
    input4.setAttribute("id", counter + " RMD");

    cell6.appendChild(input4);

    let input5 = document.createElement("input");
    input5.setAttribute("type", "number");
    input5.setAttribute("placeholder", "Total Amount");
    input5.setAttribute("class", "form-control");
    input5.setAttribute("id", counter + " RMKCET");
    input5.disabled=true;

    cell7.appendChild(input5);

    cell1.innerHTML = counter;

    setCounter(counter + 1);
}
}

return (
    <div>
      <h1 style={{ marginTop: "2%" }}>Enter Purchase Details</h1>
      <div className="container" style={{ marginTop: "3%" }}>
      <div className="col">
        <div className="left">
          <label for="date" id="date-label">Date:</label>
          <input type="date" id="date" name="date" />
        </div>
        <div className="right">
          <labell for="number" id="row">Enter the number of rows : </labell>
          <input type="number" id="num" />
          <button class="btn btn-primary" id="add-btn" onClick={generateRows}>Add</button>

        </div>
      </div>
      </div>
        <Table striped bordered hover id="table">
          <thead>
            <tr>
              <th>SNo</th>
              <th>Select Item</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={getCategory}
                  id="item"
                >
                  <option selected>Select</option>

                  {items.map((item, idx) => {
                    return (
                      <option key={idx} value={item.item}>
                        {item.item}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Category"
                    id="category"
                    disabled
                    value={category}
                  />
                </div>
              </td>
              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Vendor"
                    id="vendor"
                    disabled
                    onChange={getCategory}
                  />
                </div>
              </td>
              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Quantity"
                    id="quantity"
                  />
                </div>
              </td>

              <td>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Amount"
                    id="amount"
                  />
                </div>
              </td>
              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Total Amount"
                    id="total"
                    onChange={totAmount}
                    disabled
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <br />
        <button class="btn btn-primary" id="submit-btn" onClick={submit}>Submit</button>
      </div>
    
  );
}