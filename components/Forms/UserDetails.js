import React, { useState } from "react";
import useFormFields from "../../hooks/useFormField";
import CountriesList from "../../seed/Countries.json";
export default function UserDetails(props) {
  const {
    getFormData,
    userData: { billingAddress },
  } = props;

  const [fields, handleFieldChange] = useFormFields({
    email: billingAddress ? billingAddress.email : "",
    first_name: billingAddress ? billingAddress.first_name : "",
    last_name: billingAddress ? billingAddress.last_name : "",
    address_1: billingAddress ? billingAddress.address_1 : "",
    address_2: billingAddress ? billingAddress.address_2 : "",
    city: billingAddress ? billingAddress.city : "",
    state: billingAddress ? billingAddress.state : "",
    postcode: billingAddress ? billingAddress.postcode : "",
    phone: billingAddress ? billingAddress.phone : "",
    country: billingAddress ? billingAddress.country : "",
  });
  const [stateList, setStateList] = useState([]);
  const formSubmit = (e) => {
    e.preventDefault();
    getFormData(fields);
  };
  const handleCountryInput = (e) => {
    handleFieldChange(e);

    let state1 = CountriesList.filter(
      (country) => country.code == e.target.value
    );
    setStateList((prev) => state1[0].states);
  };
  return (
    <div className="w-full border px-2">
      <form className="my-4 px-8" onSubmit={formSubmit}>
        <div>
          <div className="my-2">
            <label for="inputFName">First Name</label>
            <input
              type="text"
              className="form-control w-full mt-2"
              id="first_name"
              placeholder="first name"
              onChange={handleFieldChange}
              required="true"
              value={fields.first_name}
            />
          </div>
          <div className="my-2">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              className="form-control  w-full mt-2"
              required="true"
              id="last_name"
              placeholder="last name"
              value={fields.last_name}
              onChange={handleFieldChange}
            />
          </div>
        </div>
        <div className="my-2">
          <label for="email">Email</label>
          <input
            type="email"
            required="true"
            className="form-control w-full mt-2"
            id="email"
            placeholder="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-2">
          <label for="phone">Phone No</label>
          <input
            type="number"
            className="form-control w-full mt-2"
            id="phone"
            required="true"
            placeholder="phone no"
            value={fields.phone}
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-2 ">
          <label for="inputCountry">Country</label>
          <select
            id="country"
            required="true"
            className="form-control w-full mt-2"
            value={fields.country}
            onChange={handleCountryInput}
            required="true"
          >
            <option defaultValue>Choose...</option>

            {CountriesList.map((c) => (
              <option value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="my-2">
          <label for="address_1">Address</label>
          <input
            type="text"
            className="form-control w-full mt-2"
            required="true"
            id="address_1"
            placeholder="1234 Main St"
            value={fields.address_1}
            onChange={handleFieldChange}
          />
        </div>
        <div className="my-2">
          <label for="address_2">Address 2</label>
          <input
            type="text"
            className="form-control w-full mt-2"
            required="true"
            id="address_2"
            value={fields.address_2}
            placeholder="Apartment, studio, or floor"
            onChange={handleFieldChange}
          />
        </div>
        <div className="form-row">
          <div className="my-2 col-md-6">
            <label for="city    ">City</label>
            <input
              type="text"
              required="true"
              className="form-control w-full mt-2"
              id="city"
              value={fields.city}
              onChange={handleFieldChange}
            />
          </div>
          <div className="my-2 col-md-4">
            <label for="inputState">State</label>
            <select
              id="state"
              className="form-control w-full mt-2"
              value={fields.state}
              onChange={handleFieldChange}
              required="true"
            >
              <option defaultValue>{fields.state}</option>

              {stateList &&
                stateList.map((st) => (
                  <option value={st.code}>{st.name}</option>
                ))}
            </select>
          </div>
          <div className="my-2 col-md-2">
            <label for="inputZip">Zip</label>
            <input
              type="zip"
              className="form-control w-full mt-2"
              id="postcode"
              required="true"
              value={fields.postcode}
              onChange={handleFieldChange}
            />
          </div>

          <button
            className="btn w-full mt-4 hover:bg-blue-700"
            onSubmit={formSubmit}
          >
            Deliver Here
          </button>
        </div>
      </form>
    </div>
  );
}
