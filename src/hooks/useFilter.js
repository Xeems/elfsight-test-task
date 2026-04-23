import { useState } from 'react';

const INITIAL_STATE = {
  name: '',
  type: '',
  status: '',
  gender: '',
  species: ''
};

function getFormFromUrl() {
  const params = new URLSearchParams(window.location.search);

  const form = { ...INITIAL_STATE };

  Object.keys(form).forEach((key) => {
    form[key] = params.get(key) || '';
  });

  return form;
}

export function useFilter() {
  const [form, setForm] = useState(getFormFromUrl);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const apply = () => {
    const url = new URL(window.location);
    const params = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );

    url.search = params.toString();
    window.location.href = url.href;
  };

  const reset = () => {
    setForm(INITIAL_STATE);
    window.location.href = window.location.pathname;
  };

  return {
    form,
    handleChange,
    apply,
    reset
  };
}
