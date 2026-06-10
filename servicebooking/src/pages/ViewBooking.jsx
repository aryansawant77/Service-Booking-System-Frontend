import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/bookingApi";

function ViewBooking() {
    const { id } = useParams();

    const [booking, setBooking] = useState(null);

   
    const fetchBooking = async () => {
        try {
            const res = await API.get(`/bookings/${id}`);
            setBooking(res.data);
        } catch (error) {
            console.error(error);
        }
    };
     useEffect(() => {
        fetchBooking();
    }, []);

    if (!booking) {
        return (
            <div className="container">
                <h2 className="page-title">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="page-title">Booking Details</h2>

            <div className="details-card">
                <p>
                    <strong>Booking ID:</strong> {booking.booking_id}
                </p>

                <p>
                    <strong>Customer Name:</strong>{" "}
                    {booking.customer_name}
                </p>

                <p>
                    <strong>Service Type:</strong>{" "}
                    {booking.service_type}
                </p>

                <p>
                    <strong>Assigned Staff:</strong>{" "}
                    {booking.assigned_staff}
                </p>

                <p>
                    <strong>Booking Date:</strong>{" "}
                    {booking.booking_date}
                </p>

                <p>
                    <strong>Booking Time:</strong>{" "}
                    {booking.booking_time}
                </p>

                <p>
                    <strong>Description:</strong>{" "}
                    {booking.service_description}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    <span>
                        {booking.status}
                    </span>
                </p>

                <p>
                    <strong>Service Fee:</strong> ₹
                    {booking.service_fee}
                </p>

                <br />

                <Link className="btn btn-primary" to="/">
                    Back to Booking List
                </Link>
            </div>
        </div>
    );
}

export default ViewBooking;