import React from "react";

const CreateCategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <div className="card shadow-lg border-light">
            <div className="card-body p-5">
                <h2 className="text-center mb-4 text-primary">Create Category</h2>
                <form onSubmit={handleSubmit}>
                    {/* Input Field */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter New Category"
                            className="form-control"
                            required
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCategoryForm;
