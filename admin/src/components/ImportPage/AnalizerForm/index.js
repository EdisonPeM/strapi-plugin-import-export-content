import React, { useState } from "react";
import PropTypes from "prop-types";

import { Label, Select } from "@buffetjs/core";
import { Row, SelectWarning } from "../../common";

import UploadFileForm from "../UploadFileForm";
import RawInputForm from "../RawInputForm";

import { useContextTypeCtx } from "../../../context/contentTypes";
import useTrads from "../../../hooks/useTrads";

import { warningNotify } from "../../../utils/notifications";
import { MapContentTypes } from "../../../utils/contentTypes";

function AnalizerForm({ onSubmit }) {
  const t = useTrads();
  const contentTypes = useContextTypeCtx();

  const [importSource, setImportSource] = useState("upload");
  const importSourcesOptions = [
    { label: t("import.source.upload"), value: "upload" },
    { label: t("import.source.raw"), value: "raw" },
  ];

  const [importDest, setImportDest] = useState("");
  const importDestOptions = MapContentTypes(
    t("import.destination.select"),
    contentTypes
  );

  const [destEmpty, setDestEmpty] = useState(false);
  const handleSubmit = async ({ data, type }) => {
    if (importDest === "") {
      setDestEmpty(true);
      return warningNotify(t("import.destination.empty"));
    }

    const target = contentTypes.find(({ uid }) => uid === importDest);
    onSubmit({ target, data, type });
  };

  return (
    <div>
      <Row>
        <div className="pt-3 col-sm-6">
          <Label htmlFor="importSource">{t("import.source")}</Label>
          <Select
            name="importSource"
            value={importSource}
            options={importSourcesOptions}
            onChange={({ target: { value } }) => setImportSource(value)}
          />
        </div>
        <div className="pt-3 col-sm-6">
          <Label htmlFor="importDest">{t("import.destination")}</Label>
          <SelectWarning
            name="importDest"
            value={importDest}
            options={importDestOptions}
            onChange={({ target: { value } }) => setImportDest(value)}
            showWarning={destEmpty}
          />
        </div>
      </Row>

      {importSource === "upload" ? (
        <UploadFileForm onSubmit={handleSubmit} />
      ) : (
        <RawInputForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}

AnalizerForm.defaultProps = {
  onSubmit: () => {},
};

AnalizerForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AnalizerForm;
