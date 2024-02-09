import { ChangeEvent, FC, useEffect, useState } from "react";

interface Filter {
  value: string;
  min: string;
  max: string;
  step: string;
}

interface EditorCompProps {}

const EditorComp: FC<EditorCompProps> = ({}) => {
  const filtersDefaultValues = {
    blur: { value: "0", min: "0", max: "10", step: "0.1" },
    brightness: { value: "1", min: "0.5", max: "1.5", step: "0.01" },
    contrast: { value: "1", min: "0.5", max: "1.5", step: "0.01" },
    "hue-rotate": { value: "0", min: "0", max: "360", step: "1" },
    sepia: { value: "0", min: "0", max: "1", step: "0.01" },
    saturate: { value: "1", min: "0", max: "2", step: "0.01" },
    invert: { value: "0", min: "0", max: "1", step: "1" },
  };

  const [image, setImage] = useState<string | null>(null);
  const [filteredImage, setFilteredImage] = useState<string | null>(null);
  const [downloadFileName, setDownloadFileName] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    [key: string]: Filter;
  }>(filtersDefaultValues);

  const resetData = () => {
    setFilteredImage(null);
    setFilters(filtersDefaultValues);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        resetData();
      };
      reader.readAsDataURL(file);
      const fileName = file.name;
      setDownloadFileName(fileName);
    }
  };

  const applyFilters = () => {
    if (image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const filterString = Object.entries(filters)
          .map(([key, filter]) => {
            const { value } = filter;
            const unit =
              key === "blur" ? "px" : key === "hue-rotate" ? "deg" : "";
            return `${key}(${value}${unit})`;
          })
          .join(" ");

        const img = new Image();
        img.src = image;
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.filter = filterString;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const filteredDataURL = canvas.toDataURL();
          setFilteredImage(filteredDataURL);
        };
      }
    }
  };

  const updateFilterIntensity = (filter: string, value: string) => {
    setFilters({
      ...filters,
      [filter]: {
        ...filters[filter],
        value,
      },
    });
  };

  const downloadFilteredImage = () => {
    if (filteredImage && downloadFileName) {
      const downloadLink = document.createElement("a");
      downloadLink.href = filteredImage;
      downloadLink.download = "edited_" + downloadFileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, image]);

  return (
    <>
      {filteredImage ? (
        <div className="file-edit-page">
          <div className="img-preview-container">
            <img
              src={filteredImage}
              alt="Image"
              className="img-preview-elem"
            />
          </div>
          <div className="cmds-column">
            {Object.keys(filters).map((filter) => (
              <div key={filter} className="filter-div">
                <label
                  htmlFor={filter}
                  className="filter-label"
                >
                  {filter}
                  <br />
                </label>
                {filters[filter].min === "0" &&
                filters[filter].max === "1" &&
                filters[filter].step === "1" ? (
                  <input
                    id={filter}
                    type="checkbox"
                    checked={filters[filter].value === "1"}
                    onChange={(e) =>
                      updateFilterIntensity(
                        filter,
                        e.target.checked ? "1" : "0"
                      )
                    }
                  />
                ) : (
                  <input
                    id={filter}
                    type="range"
                    min={filters[filter].min}
                    max={filters[filter].max}
                    step={filters[filter].step}
                    value={filters[filter].value}
                    onChange={(e) =>
                      updateFilterIntensity(filter, e.target.value)
                    }
                    className="filter-input"
                  />
                )}
              </div>
            ))}
            <div className="buttons-container">
              <button
                className="download-button"
                onClick={downloadFilteredImage}
              >
                Download filtered image
              </button>
              <button
                className="reset-button"
                onClick={() => {
                  setImage(null);
                  setDownloadFileName(null);
                  resetData();
                }}
              >
                Load new image
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="file-picker-page">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      )}
    </>
  );
};

export default EditorComp;
