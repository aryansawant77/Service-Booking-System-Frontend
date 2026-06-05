import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/bookingApi";

function EditBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customer_name: "",
        service_type: "",
        assigned_staff: "",
        booking_date: "",
        booking_time: "",
        service_description: "",
        status: "",
        service_fee: "",
    });

   
    const fetchBooking = async () => {
        try {
            const res = await API.get(`/bookings/${id}`);

            setFormData({
                customer_name: res.data.customer_name || "",
                service_type: res.data.service_type || "",
                assigned_staff: res.data.assigned_staff || "",
                booking_date: res.data.booking_date
                    ? res.data.booking_date.split("T")[0]
                    : "",
                booking_time: res.data.booking_time || "",
                service_description: res.data.service_description || "",
                status: res.data.status || "",
                service_fee: res.data.service_fee || "",
            });
        } catch (error) {
            console.error(error);
        }
    };
     useEffect(() => {
        fetchBooking();
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/bookings/${id}`, formData);

            alert("Booking Updated Successfully");

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to update booking");
        }
    };

    return (
        <div className="container">
            <h2 className="page-title">Edit Booking</h2>

            <form
                className="form-container"
                onSubmit={handleSubmit}
            >
                <label>Customer Name</label>
                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                />

                <label>Service Type</label>
                <input
                    type="text"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                />

                <label>Assigned Staff</label>
                <input
                    type="text"
                    name="assigned_staff"
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
                    value={formData.service_description}
                    onChange={handleChange}
                />

                <label>Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <label>Service Fee (₹)</label>
                <input
                    type="number"
                    name="service_fee"
                    value={formData.service_fee}
                    onChange={handleChange}
                    required
                />

                <button
                    className="btn btn-warning"
                    type="submit"
                >
                    Update Booking
                </button>
            </form>
        </div>
    );
}

export default EditBooking;