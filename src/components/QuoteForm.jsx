import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Upload, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { services } from '../data/content';

const initial = {
  name: '',
  phone: '',
  contact: '',
  brand: '',
  model: '',
  part: '',
  color: '',
  service: '',
  message: '',
};
const fields = [
  ['name', 'Your name', 'Your full name', 'text', 'name'],
  ['phone', 'Contact number', 'Your phone number', 'tel', 'tel'],
  ['contact', 'Email or Messenger', 'Email address or profile link', 'text', 'email'],
  ['brand', 'Motorcycle brand', 'e.g. Yamaha, Honda, Kawasaki', 'text', 'off'],
  ['model', 'Motorcycle model', 'e.g. NMAX, Click, Ninja', 'text', 'off'],
  ['part', 'Part to be painted', 'e.g. Full bike, fairings, wheels', 'text', 'off'],
  ['color', 'Preferred color', 'Got a color in mind?', 'text', 'off'],
];
export default function QuoteForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const form = useRef(null);
  const upload = useRef(null);
  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT;
  useEffect(() => {
    const selectService = (event) => {
      if (event.detail) setValues((current) => ({ ...current, service: event.detail }));
    };
    window.addEventListener('quote-service', selectService);
    return () => window.removeEventListener('quote-service', selectService);
  }, []);
  const update = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
    setErrors((current) => ({ ...current, [event.target.name]: undefined }));
    setStatus('');
  };
  const selectFile = (event) => {
    const candidate = event.target.files[0];
    setStatus('');
    if (!candidate) return;
    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(candidate.type) ||
      candidate.size > 10 * 1024 * 1024
    ) {
      setErrors((current) => ({
        ...current,
        image: 'Choose a JPG, PNG, or WebP image under 10 MB.',
      }));
      setFile(null);
      event.target.value = '';
      return;
    }
    setFile(candidate);
    setErrors((current) => ({ ...current, image: undefined }));
  };
  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    ['name', 'phone', 'contact', 'brand', 'model', 'part', 'service'].forEach((key) => {
      if (!values[key].trim()) next[key] = 'Please complete this field.';
    });
    if (values.phone.trim() && !/^[+\d\s().-]{7,25}$/.test(values.phone.trim()))
      next.phone = 'Enter a valid contact number.';
    if (values.contact.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact.trim()))
      next.contact = 'Enter a valid email address or use your Messenger profile link.';
    if (errors.image) next.image = errors.image;
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => form.current.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    setBusy(true);
    setFailed(false);
    setStatus('');
    try {
      if (endpoint) {
        const data = new FormData();
        Object.entries(values).forEach(([key, value]) => data.append(key, value.trim()));
        if (file) data.append('reference', file);
        const response = await fetch(endpoint, {
          method: 'POST',
          body: data,
          signal: AbortSignal.timeout(20000),
        });
        if (!response.ok) throw new Error('Unable to send your request. Please try again.');
        setStatus('Your quote request has been sent.');
      } else {
        const text = `GARWORKZ — QUOTE REQUEST\n\n${Object.entries(values)
          .map(([key, value]) => `${key.toUpperCase()}: ${value.trim() || 'Not specified'}`)
          .join(
            '\n',
          )}\n\nREFERENCE: ${file ? file.name + ' (attach this image separately when sending)' : 'None'}\n\nThis request was saved locally. It has not been sent to GARWORKZ.`;
        const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'garworkz-quote-request.txt';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setStatus(
          'Your quote summary is ready. Nothing has been sent. Keep your reference image to attach when you contact the shop.',
        );
      }
    } catch (error) {
      setFailed(true);
      setStatus(
        error.name === 'TimeoutError'
          ? 'The request timed out. Please try again.'
          : 'We couldn’t send your request. Please try again.',
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <form ref={form} className="quote-form" noValidate onSubmit={submit}>
      <div className="form-heading">
        <h3>LET’S HEAR YOUR IDEA.</h3>
        <p>Fields marked * are required.</p>
      </div>
      <div className="form-grid">
        {fields.map(([name, label, placeholder, type, autoComplete]) => (
          <div className="field" key={name}>
            <label htmlFor={`quote-${name}`}>
              {label}
              {name !== 'color' && ' *'}
            </label>
            <input
              id={`quote-${name}`}
              name={name}
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              value={values[name]}
              onChange={update}
              maxLength={name === 'phone' ? 25 : 200}
              required={name !== 'color'}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
            {errors[name] && (
              <span className="field-error" id={`${name}-error`}>
                {errors[name]}
              </span>
            )}
          </div>
        ))}
        <div className="field">
          <label htmlFor="service">Type of service *</label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={update}
            required
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.title}>{service.title}</option>
            ))}
            <option>Help me choose</option>
          </select>
          {errors.service && (
            <span className="field-error" id="service-error">
              {errors.service}
            </span>
          )}
        </div>
        <div className="field full-width">
          <label htmlFor="message">Tell us more</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your idea, your inspiration, the details that matter…"
            rows="4"
            maxLength="3000"
            value={values.message}
            onChange={update}
          />
        </div>
        <div className="field full-width">
          <label htmlFor="reference">
            Reference image <span className="muted">(optional)</span>
          </label>
          <div className="upload-field">
            <Upload size={22} />
            <span>
              {file ? file.name : 'Choose an image for your inspiration'}
              <small>JPG, PNG, or WebP · Up to 10 MB</small>
            </span>
            <input
              ref={upload}
              id="reference"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={selectFile}
              aria-invalid={!!errors.image}
              aria-describedby={errors.image ? 'image-error' : undefined}
            />
          </div>
          {file && (
            <button
              type="button"
              className="remove-file"
              onClick={() => {
                setFile(null);
                upload.current.value = '';
              }}
            >
              <X size={14} />
              Remove image
            </button>
          )}
          {errors.image && (
            <span className="field-error" id="image-error">
              {errors.image}
            </span>
          )}
        </div>
      </div>
      <p className="form-note">
        {endpoint
          ? 'Your details will only be used to respond to your project request.'
          : 'Preview mode: save your quote summary to your device. Online sending will be available when shop contact details are added.'}
      </p>
      <button type="submit" className="button button-purple submit-button" disabled={busy}>
        {busy ? 'Sending…' : endpoint ? 'Request a quote' : 'Save my quote request'}
        <ArrowUpRight size={19} />
      </button>
      {status && (
        <p className="form-status" role={failed ? 'alert' : 'status'}>
          {failed ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          {status}
        </p>
      )}
    </form>
  );
}
