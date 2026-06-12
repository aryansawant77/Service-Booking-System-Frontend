import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/bookingApi";
import { toast } from "react-toastify";

function BookingList() {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const res = await API.get("/bookings");
            setBookings(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this booking?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/bookings/${id}`);

            toast.success("Booking Deleted Successfully");

            fetchBookings();
        } catch (error) {
            toast.error("Failed to delete booking");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="container">
            <h2 className="page-title">Service Bookings</h2>

            <table className="booking-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Staff</th>
                        <th>Status</th>
                        <th>Days Until Service</th>
                        <th>Fee (₹)</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => {
                            const today = new Date();

                            const bookingDate = new Date(
                                booking.booking_date
                            );

                            const daysUntilService = Math.ceil(
                                (bookingDate - today) /
                                    (1000 * 60 * 60 * 24)
                            );

                            return (
                                <tr key={booking.booking_id}>
                                    <td>{booking.booking_id}</td>
                                    <td>{booking.customer_name}</td>
                                    <td>{booking.service_type}</td>
                                    <td>{booking.assigned_staff}</td>

                                    <td>{booking.status}</td>

                                    <td>
                                        {daysUntilService <= 0
                                            ? "Past Due"
                                            : daysUntilService}
                                    </td>

                                    <td>{booking.service_fee}</td>

                                    <td>
                                        <Link
                                            className="btn btn-primary"
                                            to={`/view/${booking.booking_id}`}
                                        >
                                            View
                                        </Link>

                                        <Link
                                            className="btn btn-warning"
                                            to={`/edit/${booking.booking_id}`}
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleDelete(
                                                    booking.booking_id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8">
                                No bookings found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BookingList;