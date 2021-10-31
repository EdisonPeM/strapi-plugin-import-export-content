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
import { successNotify, warningNotify } from "../../utils/notifications";

function ImportPage() {
  const t = useTrads();
  const [target, setTarget] = useState(null);

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
      const messages = await sendToImport({
        url: "import",
        body: { target, fields, items, asDraft },
      });

      successNotify(messages);
    } catch (error) {
      warningNotify(t(`import.items.error`));
    }

    setTarget(null);
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
          onFail={() => setTarget(null)}
        />
      )}
    </Block>
  );
}

export default memo(ImportPage);
