import { configureStore, createSlice } from '@reduxjs/toolkit';
import { campaigns } from './mock-data';

const initialState = {
  step: 1,
  schema: null,
  userId: null,
  user: {},
  campaigns: [],
  businessInfo: {
    companyName: '',
    brand: '',
    logo: '',
    category: '',
    industry: '',
    platform: '',
    description: '',
  },
  databaseIntegration: {
    host: '',
    port: '',
    username: '',
    password: '',
    databaseName: '',
  },
  channelIntegrations: {
    awsSes: {
      accessKey: '',
      secretAccessKey: '',
      region: '',
      email: '',
    },
    pushNotifications: {
      webhookUrl: '',
      authorizationToken: '',
    },
  },
  dataSelection: {
    usersTable: '',
    eventsTable: '',
  },
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setBusinessInfo: (state, action) => {
      state.businessInfo = { ...state.businessInfo, ...action.payload }
    },
    setDatabaseIntegration: (state, action) => {
      state.databaseIntegration = { ...state.databaseIntegration, ...action.payload }
    },
    setChannelIntegrations: (state, action) => {
      state.channelIntegrations = { ...state.channelIntegrations, ...action.payload }
    },
    setDataSelection: (state, action) => {
      state.dataSelection = { ...state.dataSelection, ...action.payload }
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setSchema: (state, action) => {
      state.schema = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setCampaigns: (state, action) => {
      state.campaigns = action.payload
    }
  },
})

export const onboardingActions = onboardingSlice.actions;
export const { setStep, setBusinessInfo, setDatabaseIntegration, setChannelIntegrations, setDataSelection } = onboardingSlice.actions

export const store = configureStore({
  reducer: {
    onboarding: onboardingSlice.reducer,
  },
})
