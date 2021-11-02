/*
 *
 * ImportPage
 *
 */

import React, { memo, useState } from "react";

import { Loader, Block } from "../../components/common";
import AnalizerForm from "../../components/ImportPage/AnalizerForm";
import DataMapper from "../../components/ImportPage/DataMapper";

import useTrads from "../../hooks/useTrads";
import usePluginRequest from "../../hooks/usePluginRequest";
import {
  infoNotify,
  successNotify,
  warningNotify,
} from "../../utils/notifications";

function ImportPage() {
  const t = useTrads();
  const [target, setTarget] = useState(null);
  const removeTarget = () => setTarget(null);

  // Analysis
  const {
    data: analysis,
    loading: isAnalysisLoading,
    sendData: sendToAnalysis,
  } = usePluginRequest();
  const analizeImports = async ({ target, data, type }) => {
    try {
      await sendToAnalysis({
        url: "pre-analyze",
        body: { data, type },
      });

      setTarget(target);
      successNotify(t("import.analyze.success"));
    } catch (error) {
      warningNotify(t("import.analyze.error"));
    }
  };

  // Import
  const {
    data: importMessages,
    loading: isImportingLoading,
    sendData: sendToImport,
  } = usePluginRequest();
  const uploadData = async ({ fields, items, asDraft }) => {
    try {
      const { message, succesfully } = await sendToImport({
        url: "import",
        body: { target, fields, items, asDraft },
      });

      // TODO: Use internationalization messages t('key.subkey')
      if (succesfully) infoNotify(message);
      else warningNotify(message);
    } catch (error) {
      warningNotify(t(`import.items.error`));
    }

    removeTarget();
  };

  return (
    <Block title={t("import.title")} description={t("import.description")}>
      {(isAnalysisLoading || isImportingLoading) && <Loader />}
      {target === null ? (
        <AnalizerForm onSubmit={analizeImports} />
      ) : (
        <DataMapper
          analysis={analysis}
          target={target}
          onSubmit={uploadData}
          onFail={removeTarget}
        />
      )}
    </Block>
  );
}

export default memo(ImportPage);
