// @flow
import React, { useState, useCallback } from "react";
import { createAction } from "@ledgerhq/live-common/lib/hw/actions/manager";
import Dashboard from "~/renderer/screens/manager/Dashboard";
import { SyncSkipUnderPriority } from "@ledgerhq/live-common/lib/bridge/react";
import DeviceAction from "~/renderer/components/DeviceAction";
import { command } from "~/renderer/commands";
import { mockedEventEmitter } from "~/renderer/components/DebugMock";
import { getEnv } from "@ledgerhq/live-common/lib/env";

const connectManagerExec = command("connectManager");
const action = createAction(getEnv("MOCK") ? mockedEventEmitter : connectManagerExec);

const Manager = () => {
  const [appsToRestore, setRestoreApps] = useState(null);
  const [result, setResult] = useState(null);
  const onReset = useCallback(() => {
    if (result) return;
    setRestoreApps(null);
    setResult(null);
  }, [result]);
  const proceedToAppReinstall = useCallback(apps => {
    setRestoreApps(apps);
  }, []);
  const onResult = useCallback(result => setResult(result), []);

  return (
    <>
      <SyncSkipUnderPriority priority={999} />
      {result ? (
        <Dashboard
          {...result}
          onReset={onReset}
          proceedToAppReinstall={proceedToAppReinstall}
          appsToRestore={appsToRestore}
        />
      ) : (
        <DeviceAction onResult={onResult} action={action} request={null} />
      )}
    </>
  );
};

export default Manager;
