import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'companies',
  initialState: [
    {
      id: 1,
      name: 'ABC Corp',
      location: 'New York',
      periodicity: 'Monthly',
      linkedin: 'https://linkedin.com/company/abccorp',
      phoneNumber: '123-456-7890',
      comments: 'Great collaboration opportunities.',
      email: 'contact@abccorp.com',
    },
    {
      id: 2,
      name: 'XYZ Inc.',
      location: 'San Francisco',
      periodicity: 'Quarterly',
      linkedin: 'https://linkedin.com/company/xyzinc',
      phoneNumber: '987-654-3210',
      comments: 'Looking to expand partnership.',
      email: 'info@xyzinc.com',
    },
    {
      id: 3,
      name: 'Tech Solutions',
      location: 'Seattle',
      periodicity: 'Bi-Weekly',
      linkedin: 'https://linkedin.com/company/techsolutions',
      phoneNumber: '456-789-0123',
      comments: 'Potential for joint projects.',
      email: 'hello@techsolutions.com',
    },
    {
      id: 4,
      name: 'Global Ventures',
      location: 'Boston',
      periodicity: 'Monthly',
      linkedin: 'https://linkedin.com/company/globalventures',
      phoneNumber: '321-654-9870',
      comments: 'Focus on innovation.',
      email: 'support@globalventures.com',
    },
    {
      id: 5,
      name: 'Bright Future Ltd.',
      location: 'Austin',
      periodicity: 'Weekly',
      linkedin: 'https://linkedin.com/company/brightfuture',
      phoneNumber: '654-321-0987',
      comments: 'Interested in technology advancements.',
      email: 'careers@brightfuture.com',
    },
  ],
  reducers: {
    addCompany: (state, action) => {
      state.push(action.payload);
    },
    updateCompany: (state, action) => {
      const index = state.findIndex((company) => company.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteCompany: (state, action) => {
      return state.filter((company) => company.id !== action.payload);
    },
  },
});

export const { addCompany, updateCompany, deleteCompany } = companySlice.actions;

export default companySlice.reducer;
