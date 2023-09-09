import "./AddClinic.css";
import Header from "../../components/Header/Header";
import { useState, useRef } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import { useAddClinicMutation } from "../../api/clinic";
import { useNavigate } from "react-router-dom";
import add from "date-fns/add";

const AddClinic = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [validated, setValidated] = useState(false);

  const [clinicApi] = useAddClinicMutation();

  const nagivate = useNavigate();

  const details = useRef({});

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("all not valid ");
    } else {
      const createdAt = new Date();

      const validTill = add(createdAt, { days: 15 });

      console.log({ ...details.current, createdAt, validTill });

      clinicApi({ ...details.current, createdAt, validTill });

      nagivate("/clinics", { replace: true });
    }

    setValidated(true);
  };

  return (
    <div className="Add-clinic-container">
      <Header />
      <main className="Add-clinic-main-container">
        {
          <Form
            className="Add-clinic-form-container"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="m-0 mb-3 ">
              {clinicNameHandler(details)}
              {addressHandler(details)}
              {countryHandler(country, setCountry, details)}
              {stateHandler(country, state, setState, details)}
              {cityHandler(country, state, city, setCity, details)}
              {zipCodeHandler(details)}
              {timeZoneHandler(country, details)}
            </Row>
            <Button type="submit">Submit</Button>
          </Form>
        }
      </main>
    </div>
  );
};

const clinicNameHandler = (details) => {
  return (
    <Form.Group
      className="col-12 col-sm-6 col-lg-4 mb-2"
      controlId="clinicName"
    >
      <Form.Label>Clinic name</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Clinic name"
        onChange={(e) => {
          details.current.name = e.target.value;
        }}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Please provide a valid clinic name.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

const addressHandler = (details) => {
  return (
    <Form.Group className="col-12 col-sm-6 col-lg-4 mb-2" controlId="address">
      <Form.Label>Address</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Address"
        onChange={(e) => {
          details.current.address = e.target.value;
        }}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Please provide a valid Address.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

const countryHandler = (country, setCountry, details) => {
  const countries = Country.getAllCountries();
  return (
    <Form.Group className="col-12 col-sm-6 col-lg-4 mb-2 " controlId="country">
      <Form.Label>Country</Form.Label>
      <Form.Select
        required
        value={country}
        onChange={(e) => {
          details.current.country = e.target.value;
          setCountry(e.target.value);
        }}
      >
        <option value="">Select Country</option>
        {countries.map((item) => {
          return (
            <option value={item.isoCode} key={item.isoCode}>
              {item.name}
            </option>
          );
        })}
      </Form.Select>
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Please choose an option.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

const stateHandler = (country, state, setState, details) => {
  const states = State.getStatesOfCountry(country);
  if (states.length > 0)
    return (
      <Form.Group className="col-12 col-sm-6 col-lg-4 mb-2" controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Select
          required
          value={state}
          onChange={(e) => {
            details.current.state = e.target.value;
            setState(e.target.value);
          }}
        >
          <option value="">Select State</option>
          {states.map((item, index) => {
            return (
              <option value={item.isoCode} key={index}>
                {item.name}
              </option>
            );
          })}
        </Form.Select>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please provide a valid Address.
        </Form.Control.Feedback>
      </Form.Group>
    );

  if (states.length == 0)
    return (
      <Form.Group className="col-12 col-sm-6 col-lg-4 mb-2" controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control
          required
          value={state}
          onChange={(e) => {
            details.current.state = e.target.value;
            setState(e.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please Enter a valid state.
        </Form.Control.Feedback>
      </Form.Group>
    );
};

const cityHandler = (country, state, city, setCity, details) => {
  const cities = City.getCitiesOfState(country, state);

  if (cities.length > 0)
    return (
      <Form.Group className="col-12 col-sm-6 col-lg-4 mb-2" controlId="state">
        <Form.Label>City</Form.Label>
        <Form.Select
          required
          value={city}
          onChange={(e) => {
            details.current.city = e.target.value;
            setCity(e.target.value);
          }}
        >
          <option value="">Select City</option>
          {cities.map((item, index) => {
            return (
              <option value={item.isoCode} key={index}>
                {item.name}
              </option>
            );
          })}
        </Form.Select>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please choose an option.
        </Form.Control.Feedback>
      </Form.Group>
    );
  else if (cities.length === 0)
    return (
      <Form.Group className="col-12 col-sm-6 col-lg-4 mb-2" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          required
          value={city}
          onChange={(e) => {
            details.current.city = e.target.value;
            setCity(e.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please Enter a valid city.
        </Form.Control.Feedback>
      </Form.Group>
    );
};

const zipCodeHandler = (details) => {
  return (
    <Form.Group className="col-12 col-sm-6 col-lg-4 mb-2" controlId="zipcode">
      <Form.Label>Zip code</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="zip code"
        onChange={(e) => {
          details.current.zipCode = e.target.value;
        }}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Please provide a valid zipcode.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

const timeZoneHandler = (country, details) => {
  const currentCountry = Country.getCountryByCode(country);
  const zoneName = currentCountry?.timezones[0]?.zoneName;
  details.current.timeZone = zoneName;
  return (
    <Form.Group className="col-12 col-sm-6 col-lg-4 mb-2" controlId="timezone">
      <Form.Label>Timezone</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="timezone"
        defaultValue={zoneName}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Please provide a valid Timezone.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default AddClinic;
