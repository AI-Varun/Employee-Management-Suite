import React, { useState, useEffect } from 'react';
import './styles/EmployeeForm.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { action, employee } = location.state || {};

    useEffect(() => {
        if (!action) {
            navigate('/employee-list');
        }
    }, [action, navigate]);

    const [name, setName] = useState(employee?.name || '');
    const [email, setEmail] = useState(employee?.email || '');
    const [mobileNo, setMobileNo] = useState(employee?.mobileNo || '');
    const [designation, setDesignation] = useState(employee?.designation || '');
    const [gender, setGender] = useState(employee?.gender || 'Male');
    const [course, setCourse] = useState(employee?.course || 'MCA');
    const [imgUpload, setImgUpload] = useState(employee?.image);
    const [previewImage, setPreviewImage] = useState(employee?.image ? `data:image/jpeg;base64,${employee.image}` : '');
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobileNo', mobileNo);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', course);

        if (imgUpload) {
            formData.append('image', imgUpload);
        } else if (employee?.image) {
            formData.append('existingImage', employee.image);
        }

        try {
            const apiUrl = action === 'create' ? 'http://localhost:1220/api/v1/create' : `http://localhost:1220/api/v1/users/${employee.uniqueId}`;
            const response = await axios.post(apiUrl, formData);

            if (response.status === 200 || response.status === 201) {
                toast.success('Employee data submitted successfully!');
                navigate('/employee-list');
            } else {
                handleErrors(response.data.errors);
            }
        } catch (error) {
            console.error('Error during API request:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                handleErrors(error.response.data.errors);
            } else {
                toast.error('Error submitting data. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleErrors = (errors) => {
        console.log("errors", errors)
        console.log()
        errors.forEach(error => {
            toast.error(`${error.message}`);
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                setImgUpload(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                toast.error('Only JPEG and PNG images are supported.');
            }
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="content">
                <div className="form-section">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className='input-style'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='input-style'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobileNo">Mobile No:</label>
                            <input
                                id="mobileNo"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                required
                                className='input-style'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="designation">Designation:</label>
                            <select
                                id="designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                                className='input-style'
                            >
                                <option value="">Select</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="Male"
                                        checked={gender === 'Male'}
                                        onChange={() => setGender('Male')}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Female"
                                        checked={gender === 'Female'}
                                        onChange={() => setGender('Female')}
                                    />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Course:</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="MCA"
                                        checked={course === 'MCA'}
                                        onChange={() => setCourse('MCA')}
                                    />
                                    MCA
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="BCA"
                                        checked={course === 'BCA'}
                                        onChange={() => setCourse('BCA')}
                                    />
                                    BCA
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="BSC"
                                        checked={course === 'BSC'}
                                        onChange={() => setCourse('BSC')}
                                    />
                                    BSC
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="image-upload-label">Image Upload:</label>
                            {previewImage && (
                                <div className="image-preview">
                                    <img src={previewImage} alt="Employee Preview" className="preview-img" />
                                </div>
                            )}
                            <div className="file-upload">
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className="upload-button"
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    {imgUpload || previewImage ? 'Change Image' : 'Upload Image'}
                                </button>
                            </div>
                        </div>


                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : action === 'create' ? 'Submit' : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeForm;
