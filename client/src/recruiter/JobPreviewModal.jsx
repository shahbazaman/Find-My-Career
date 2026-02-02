const JobPreviewModal = ({ job, onClose, onConfirm }) => {
  return (
    <div className="overlay">
      <div className="preview-box">
        <h3>{job.jobTitle}</h3>
        <p><b>Company:</b> {job.companyName}</p>
        <p><b>Location:</b> {job.location}</p>
        <p>{job.description}</p>

        <button onClick={onConfirm}>Publish</button>
        <button onClick={onClose}>Edit</button>
      </div>
    </div>
  );
};

export default JobPreviewModal;
