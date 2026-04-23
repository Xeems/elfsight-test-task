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
    const params = new URLSearchParams();

    Object.entries(form).forEach(([key, value]) => {
      // Проверяем на наличие значения.
      // Если value равно '', null или undefined — ключ НЕ добавится в params
      if (value) {
        params.set(key, value);
      }
    });

    const search = params.toString();
    const newUrl = `${window.location.pathname}${search ? `?${search}` : ''}`;

    // Важно: если используете window.location.href, страница перезагрузится
    // и getFormFromUrl заново прочитает URL.
    window.location.href = newUrl;
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
