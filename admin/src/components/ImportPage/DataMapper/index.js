import React, { useReducer, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";

import { Button, Checkbox } from "@buffetjs/core";
import { Row } from "../../common";
import MappingTable from "../MappingTable";

import useTrads from "../../../hooks/useTrads";
import reducer from "./reducer";
import { getInitialState } from "./state";
import { changeFieldTarget, removeItem, toggleAsDraft } from "./actions";

import { MapHeaders, MapOptions } from "./utils";
import { warningNotify } from "../../../utils/notifications";
import { SINGLE_TYPE } from "../../../constants/contentTypes";

function DataMapper({ analysis, target, onSubmit, onCancel }) {
  const t = useTrads();
  const hasDraftAndPublish = !!target?.options?.draftAndPublish;
  const isSingleType = useMemo(() => target?.kind === SINGLE_TYPE, [target]);
  const initialState = useMemo(
    () => getInitialState(analysis, target),
    [analysis, target]
  );

  // Complex-Multiple State
  const [{ asDraft, items, fields, mapFields, fieldsMapping }, dispatch] =
    useReducer(reducer, initialState);

  // Mapping Table Handlers
  const handleToggleAsDraft = () => dispatch(toggleAsDraft());
  const deleteItem = useCallback(
    (deletedItem) => () => dispatch(removeItem(deletedItem)),
    []
  );
  const selectDestinationField = useCallback(
    (field) =>
      ({ target: { value } }) =>
        dispatch(changeFieldTarget(field, value)),
    []
  );

  // Mapping Table Constants
  const headers = useMemo(() => MapHeaders(fieldsMapping), [fieldsMapping]);
  const options = useMemo(() => MapOptions(fields), [fields]);

  // Upload Data
  const uploadData = async () => {
    // Prevent Upload Empty Data;
    if (items.length === 0) {
      warningNotify(t("import.items.empty"));
      return onCancel();
    }

    onSubmit({ items, fieldsMapping, asDraft });
  };

  return (
    <div className="pt-3 col-12">
      <Prompt message={t("import.mapper.unsaved")} />
      <Row>
        <h3>{t("import.mapper.title")}</h3>
        <MappingTable
          mappingHeaders={headers}
          mappingRows={items}
          mappingRowsHeaders={mapFields}
          headersMappingOptions={options}
          onChangeMapping={selectDestinationField}
          onDeleteRow={deleteItem}
          onlyFistRow={isSingleType}
        />
      </Row>
      <Row>
        <span className="mr-3">{t("import.mapper.count")}:</span>
        <strong>{isSingleType ? 1 : items.length}</strong>
      </Row>
      {hasDraftAndPublish && (
        <Row>
          <Checkbox
            message={t("import.mapper.publish")}
            name="uploadAsDraft"
            value={!asDraft}
            onChange={handleToggleAsDraft}
          />
        </Row>
      )}
      <Row>
        <Button label={t("import.mapper.import")} onClick={uploadData} />
        <Button
          className="ml-3"
          label={t("import.mapper.cancel")}
          color="delete"
          onClick={onCancel}
        />
      </Row>
    </div>
  );
}

DataMapper.defaultProps = {
  analysis: {},
  target: {},
  onSubmit: () => {},
  onCancel: () => {},
};

DataMapper.propTypes = {
  analysis: PropTypes.any,
  target: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DataMapper;
