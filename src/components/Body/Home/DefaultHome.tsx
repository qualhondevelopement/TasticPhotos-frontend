"use client";

import { useState } from "react";

import Image from "next/image";
import { FiUpload } from "react-icons/fi";

// Define a type for poses
interface Pose {
  id: number;
  name: string;
  img: string;
}

// Define poses array
const poses: Pose[] = [
  { id: 1, name: "Pose 1", img: "/poses/pose1.jpg" },
  { id: 2, name: "Pose 2", img: "/poses/pose2.jpg" },
  { id: 3, name: "Pose 3", img: "/poses/pose3.jpg" },
];

export default function DefaultHome() {
  const [selectedPose, setSelectedPose] = useState<Pose | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePoseSelect = (pose: Pose) => {
    setSelectedPose(pose);
  };

  const handleGenerate = () => {
    if (image && selectedPose) {
      // Implement your generation logic here
      setGeneratedOutput(`Generated output with ${selectedPose.name}`);
    } else {
      setGeneratedOutput("Please upload an image and select a pose.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="align-items-center mb-4 gap-24">
        <h2 className="me-3 mr-10 mb-4">Upload Your Picture</h2>{" "}
        <label className="upload-area  align-items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="d-none"
          />
          <div className="upload-text d-flex align-items-center">
            <FiUpload className="upload-icon me-2" />
            <span>Click to Upload Image</span>
          </div>
        </label>
      </div>

      {image && (
        <div className="mb-4">
          <h4>Your Uploaded Image:</h4>
          <div className="d-flex flex-column flex-lg-row align-items-start gap-4 image-pose-container">
            {/* Uploaded Image Preview */}
            <div className="uploaded-image-container">
              <Image
                src={image}
                alt="Uploaded"
                // layout="responsive"
                width={350}
                height={300}
                className="rounded shadow-sm"
              />
            </div>

            {/* Pose Selection Section */}
            <div className="pose-selection">
              <h3 className="pose-selection-title">Select a Pose</h3>
              <div className="row gx-3">
                {poses.map((pose) => (
                  <div className="col-6 col-md-4 mb-4" key={pose.id}>
                    <div
                      className={`card pose-card ${
                        selectedPose === pose ? "selected-pose" : ""
                      }`}
                      onClick={() => handlePoseSelect(pose)}
                    >
                      <img
                        src={pose.img}
                        className="card-img-top rounded"
                        alt={pose.name}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title m-0">{pose.name}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedPose && <h4>You have selected: {selectedPose.name}</h4>}

              {image && selectedPose && (
                <button
                  className="btn btn-success mt-4 p-2 mx-5"
                  onClick={handleGenerate}
                >
                  Generate
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {generatedOutput && (
        <div className="mt-4 alert alert-info">{generatedOutput}</div>
      )}
    </div>
  );
}
