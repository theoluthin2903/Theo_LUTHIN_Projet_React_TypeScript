import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useProfile } from "../context/ProfileContext";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
}

type ProfileFormErrors = Partial<Record<keyof ProfileFormData, string>>;

const initialFormData: ProfileFormData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  bio: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Profile() {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const { setUsername } = useProfile();

  const validateField = (name: keyof ProfileFormData, value: string): string => {
    if (name === "bio") {
      return "";
    }

    if (!value.trim()) {
      return "Ce champ est obligatoire.";
    }

    if (name === "email" && !EMAIL_REGEX.test(value.trim())) {
      return "Veuillez saisir une adresse e-mail valide.";
    }

    return "";
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof ProfileFormData;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    setErrors((prev) => {
      if (!prev[fieldName]) {
        return prev;
      }

      const fieldError = validateField(fieldName, value);
      const nextErrors = { ...prev };

      if (fieldError) {
        nextErrors[fieldName] = fieldError;
      } else {
        delete nextErrors[fieldName];
      }

      return nextErrors;
    });

    if (successMessage) {
      setSuccessMessage("");
      setSavedUsername("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fieldNames = Object.keys(formData) as (keyof ProfileFormData)[];
    const nextErrors: ProfileFormErrors = {};

    fieldNames.forEach((fieldName) => {
      const fieldError = validateField(fieldName, formData[fieldName]);
      if (fieldError) {
        nextErrors[fieldName] = fieldError;
      }
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage("");
      setSavedUsername("");
      return;
    }

    console.log("Profil enregistré :", formData);
    setSuccessMessage("Profil enregistré avec succès.");
    setSavedUsername(formData.username.trim());
    setUsername(formData.username.trim());
  };

  return (
    <section>
      <section className="hero-copy">
        <span className="eyebrow">Profil</span>
        <h1>Mon profil</h1>
        <p>Gérez vos informations personnelles et votre biographie.</p>
      </section>

      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <div className="profile-form__row">
          <div className="profile-form__field">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Votre prénom"
              value={formData.firstName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
            {errors.firstName && (
              <p className="profile-form__error" id="firstName-error" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="profile-form__field">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Votre nom"
              value={formData.lastName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <p className="profile-form__error" id="lastName-error" role="alert">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="profile-form__field">
          <label htmlFor="username">Pseudonyme</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Votre pseudonyme"
            value={formData.username}
            onChange={handleChange}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <p className="profile-form__error" id="username-error" role="alert">
              {errors.username}
            </p>
          )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p className="profile-form__error" id="email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="bio">Biographie (facultatif)</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Parlez-nous un peu de vous..."
            rows={5}
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="search-submit profile-form__submit">
          Enregistrer mon profil
        </button>

        {successMessage && (
          <div className="profile-form__success" role="status">
            <p className="profile-form__success-message">{successMessage}</p>
            <p className="profile-form__welcome">Bienvenue, {savedUsername} !</p>
          </div>
        )}
      </form>
    </section>
  );
}

export default Profile;