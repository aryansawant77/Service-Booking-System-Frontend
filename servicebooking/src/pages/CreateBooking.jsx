import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/bookingApi";

function CreateBooking() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customer_name: "",
        service_type: "",
        assigned_staff: "",
        booking_date: "",
        booking_time: "",
        service_description: "",
        service_fee: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/bookings", formData);

            alert("Booking Created Successfully");

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to create booking");
        }
    };

    return (
        <div className="container">
            <h2 className="page-title">Create New Booking</h2>

            <form
                className="form-container"
                onSubmit={handleSubmit}
            >
                <label>Customer Name</label>
                <input
                    type="text"
                    name="customer_name"
                    placeholder="Enter customer name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                />

                <label>Service Type</label>
                <input
                    type="text"
                    name="service_type"
                    placeholder="Enter service type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                />

                <label>Assigned Staff</label>
                <input
                    type="text"
                    name="assigned_staff"
                    placeholder="Enter staff name"
                    value={formData.assigned_staff}
                    onChange={handleChange}
                    required
                />

                <label>Booking Date</label>
                <input
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                    required
                />

                <label>Booking Time</label>
                <input
                    type="time"
                    name="booking_time"
                    value={formData.booking_time}
                    onChange={handleChange}
                    required
                />

                <label>Service Description</label>
                <textarea
                    name="service_description"
                    placeholder="Enter service description"
                    value={formData.service_description}
                    onChange={handleChange}
                />

                <label>Service Fee (₹)</label>
                <input
                    type="number"
                    name="service_fee"
                    placeholder="Enter service fee"
                    value={formData.service_fee}
                    onChange={handleChange}
                    required
                />

                <button
                    className="btn btn-success"
                    type="submit"
                >
                    Create Booking
                </button>
            </form>
        </div>
    );
}

export default CreateBooking;