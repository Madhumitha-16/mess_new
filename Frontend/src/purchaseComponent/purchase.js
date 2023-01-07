import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useState ,useEffect} from "react";
import './purchase.css';

export default function Purchase() {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(2);


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
    let id=e.target.id;
    let quantity=document.getElementById(id[0]+" quantity");
    let amountkg=document.getElementById(id[0]+" amount");
    let total=document.getElementById(id[0]+" total");
    total.value=quantity.value*amountkg.value;
  };

  const getCategory=async (e)=>{
    let item=e.target.value; 
    let id=e.target.id; 
    let category = document.getElementById(id[0]+" category");
    let vendor = document.getElementById(id[0]+" vendor"); 
    axios
      .post("http://localhost:5000/purchase/getCategoryVendor", {
        item:item,
      })
      .then(function (response) {
        console.log(response.data[0].category);
        category.value = response.data[0].category;
        vendor.value = response.data[0].vendorName;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  const submit = () => {
    let arr = [];
    let date = document.getElementById("date").value;
    class Obj {
      constructor(item,category,quantity,amount,total) {
        this.item = item;
        this.category = category;
        this.quantity = quantity;
        this.amount = amount;
        this.total = total;
        this.date = date;
      }
    }
    for (let i = 1; i < counter; i++) {
      let item = document.getElementById(i+" item").value;
      let category = document.getElementById(i+" category").value;
      let quantity=document.getElementById(i+" quantity").value;
      let amountkg=document.getElementById(i+" amount").value;
      let amount=document.getElementById(i+" total").value;
      let obj = new Obj(item,category,quantity,amountkg,amount );
      arr.push(obj);
      console.log(arr);
    }
    console.log(arr);
    axios.post('http://localhost:5000/purchase/add', {
      arr:arr
    })
    .then(async function (response) {
      await console.log(response.data);
      alert("Items added successfully")
      window.location.reload();

    })
    .catch(async function (error) {
      await console.log(error);
    });
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

    const select = document.createElement("Select");
    select.setAttribute("class", "form-select");
    const option = document.createElement("option");
    const optionText = document.createTextNode("Select");
    option.appendChild(optionText);
    option.setAttribute("value", "select");
    select.setAttribute("id", counter+" item");
    console.log(counter);
    select.addEventListener("change", getCategory, false);
    select.appendChild(option);

    for (let i = 1; i < items.length; i++) {
      const option = document.createElement("option");
      const optionText = document.createTextNode(items[i].item);
      option.appendChild(optionText);
      option.setAttribute("value", items[i].item);
      select.appendChild(option);
    }

    cell2.appendChild(select);


    let input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("placeholder", "Category");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("id", counter + " category");
    input1.disabled = true;

    cell3.appendChild(input1);


    let input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.setAttribute("placeholder", "Vendor");
    input2.setAttribute("class", "form-control");
    input2.setAttribute("id", counter + " vendor");
    input2.disabled = true;

    cell4.appendChild(input2);


    let input3 = document.createElement("input");
    input3.setAttribute("type", "number");
    input3.setAttribute("placeholder", "Quantity");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("id", counter + " quantity");
    input3.addEventListener("change",totAmount, false);
    cell5.appendChild(input3);


    let input4 = document.createElement("input");
    input4.setAttribute("type", "number");
    input4.setAttribute("placeholder", "Amount");
    input4.setAttribute("class", "form-control");
    input4.setAttribute("id", counter + " amount");
    input4.addEventListener("change",totAmount, false);
    cell6.appendChild(input4);

    let input5 = document.createElement("input");
    input5.setAttribute("type", "number");
    input5.setAttribute("placeholder", "Total Amount");
    input5.setAttribute("class", "form-control");
    input5.setAttribute("id", counter + " total");
    input5.disabled=true;
    cell7.appendChild(input5);

    cell1.innerHTML = counter;

    setCounter(counter + 1);
    console.log(counter);
}
console.log(counter);
}

return (
    <div>
      <h1 style={{ marginTop: "2%" }}>Enter Purchase Details</h1>
      <div className="container" style={{ marginTop: "3%" }}>
      <div className="col">
        <div className="left">
          <label htmlFor="date" id="date-label">Date:</label>
          <input type="date" id="date" name="date" />
        </div>
        <div className="right">
          <label htmlFor="number" id="row">Enter the number of rows : </label>
          <input type="number" id="num" />
          <button className="btn btn-primary" id="add-btn" onClick={generateRows}>Add</button>

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
                  className="form-select"
                  aria-label="Default select example"
                  onChange={getCategory}
                  id="1 item"
                >
                  <option>Select</option>

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
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category"
                    id="1 category"
                    disabled
                    defaultValue=""
                  />
                </div>
              </td>
              <td>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Vendor"
                    id="1 vendor"
                    disabled
                    defaultValue=""
                  />
                </div>
              </td>
              <td>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    onChange={totAmount}
                    id="1 quantity"
                  />
                </div>
              </td>

              <td>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Amount"
                    onChange={totAmount}
                    id="1 amount"
                  />
                </div>
              </td>
              <td>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Total Amount"
                    id="1 total"
                    disabled
                    defaultValue=""
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <br />
        <button className="btn btn-primary" id="submit-btn" onClick={submit}>Submit</button>
      </div>
    
  );
}