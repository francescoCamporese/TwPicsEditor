import { ChangeEvent, FC, useEffect, useState } from "react";

interface Filter {
  value: string;
  min: string;
  max: string;
  step: string;
}

interface EditorCompProps {
  appBarHeight: string;
}

const EditorComp: FC<EditorCompProps> = ({ appBarHeight }) => {
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
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-2 bg-white dark:bg-gray-800 sm:h-[calc(100vh-" +
            appBarHeight +
            ")]"
          }
        >
          <div className="p-4 sm:pl-8 sm:pr-4">
            <img
              src={filteredImage}
              alt="Image"
              className="max-w-full h-auto"
            />
          </div>
          <div className="p-4 sm:pr-8 sm:pl-4">
            {Object.keys(filters).map((filter) => (
              <div key={filter} className="mb-4">
                <label
                  htmlFor={filter}
                  className="mr-2 text-gray-700 dark:text-gray-300"
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
                    className="w-full"
                  />
                )}
              </div>
            ))}
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:w-auto md:mr-2"
                onClick={downloadFilteredImage}
              >
                Download filtered image
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:w-auto"
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
        <div
          className={
            "flex items-center justify-center bg-white dark:bg-gray-800 h-[calc(100vh-" +
            appBarHeight +
            ")]"
          }
        >
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      )}
    </>
  );
};

export default EditorComp;
