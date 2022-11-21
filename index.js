import ActivityHeader from "./ActivityHeader";
export const applyCustomCode = externalCodeSetup => {
  externalCodeSetup.activitiesScreenApi.setActivityHeaderComponent(props => <ActivityHeader {...props} />)
}