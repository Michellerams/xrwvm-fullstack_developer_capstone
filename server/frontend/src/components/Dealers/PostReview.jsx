import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const id = params.id;

  // Construct URLs using the current origin for reliability
  const root_url = window.location.origin + "/";
  const dealer_url = `${root_url}djangoapp/dealer/${id}`;
  const review_url = `${root_url}djangoapp/add_review`;
  const carmodels_url = `${root_url}djangoapp/get_cars`;

  const postReview = async () => {
    console.log("Post Review button clicked!");

    const firstname = sessionStorage.getItem("firstname") || "";
    const lastname = sessionStorage.getItem("lastname") || "";
    let name = `${firstname} ${lastname}`.trim();
    
    if (name === "" || name.includes("null")) {
      name = sessionStorage.getItem("username") || "Anonymous";
    }

    // Validation
    if (!model || review.trim() === "" || date === "" || year === "" || !model) {
      alert("All fields are required:\n- Review text\n- Purchase Date\n- Car Make & Model\n- Car Year");
      return;
    }

    const modelParts = model.trim().split(" ");
    if (modelParts.length < 2) {
      alert("Invalid car make/model selection. Please choose from the dropdown.");
      return;
    }

    const make_chosen = modelParts[0];
    const model_chosen = modelParts.slice(1).join(" "); // in case model name has spaces

    const payload = {
      name: name,
      dealership: id,
      review: review.trim(),
      purchase: true,
      purchase_date: date,
      car_make: make_chosen,
      car_model: model_chosen,
      car_year: parseInt(year, 10),
    };

    console.log("Sending review payload:", payload);

    setIsSubmitting(true);

    try {
      const res = await fetch(review_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const json = await res.json();
      console.log("Server response:", json);

      if (json.status === 200) {
        alert("Review posted successfully!");
        window.location.href = `${window.location.origin}/dealer/${id}`;
      } else {
        alert(`Error from server: ${json.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to post review:", error);
      alert(`Failed to post review: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url);
      const data = await res.json();
      if (data.status === 200 && data.dealer?.length > 0) {
        setDealer(data.dealer[0]);
      }
    } catch (error) {
      console.error("Failed to fetch dealer:", error);
    }
  };

  const get_cars = async () => {
    try {
      const res = await fetch(carmodels_url);
      const data = await res.json();
      if (data.CarModels) {
        setCarmodels(data.CarModels);
      }
    } catch (error) {
      console.error("Failed to fetch car models:", error);
    }
  };

  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name || "Dealership"}</h1>

        <textarea
          id="review"
          cols="50"
          rows="7"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="input_field">
          <label>Purchase Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="input_field">
          <label>Car Make & Model:</label>
          <select
            name="cars"
            id="cars"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="" disabled>
              Choose Car Make and Model
            </option>
            {carmodels.map((carmodel, index) => (
              <option
                key={index}
                value={`${carmodel.CarMake} ${carmodel.CarModel}`}
              >
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>
        </div>

        <div className="input_field">
          <label>Car Year:</label>
          <input
            type="number"
            min="2015"
            max="2025"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2020"
          />
        </div>

        <div>
          <button
            className="postreview"
            onClick={postReview}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;