import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type AuthMode = "login" | "register";

function Auth() {
  const navigate = useNavigate();
  const { user, login, register } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const error =
      mode === "login"
        ? login(identifier, password)
        : register(email, username, password);

    if (error) {
      setErrorMessage(error);
      return;
    }

    navigate(mode === "login" ? "/profile" : "/auth", { replace: true });

    // Après une inscription, on reste sur l'écran d'authentification.
    // Le formulaire repasse automatiquement en mode connexion.
    if (mode === "register") {
      setMode("login");
      setIdentifier(email);
      setEmail("");
      setUsername("");
      setPassword("");
      setShowPassword(false);
    }
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrorMessage("");
    setIdentifier("");
    setEmail("");
    setUsername("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">CineScope</span>
        <h1>{mode === "login" ? "Connexion" : "Créer un compte"}</h1>
        <p className="auth-card__intro">
          {mode === "login"
            ? "Connectez-vous pour retrouver votre profil et vos films."
            : "Créez votre compte pour conserver votre profil et vos activités."}
        </p>

        <div className="auth-tabs" role="tablist" aria-label="Authentification">
          <button
            type="button"
            className={mode === "login" ? "auth-tab active" : "auth-tab"}
            onClick={() => switchMode("login")}
          >
            Se connecter
          </button>
          <button
            type="button"
            className={mode === "register" ? "auth-tab active" : "auth-tab"}
            onClick={() => switchMode("register")}
          >
            S'inscrire
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "login" ? (
            <div className="auth-form__field">
              <label htmlFor="auth-identifier">E-mail ou pseudonyme</label>
              <input
                id="auth-identifier"
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="votre@email.com ou votre pseudo"
                autoComplete="username"
                required
              />
            </div>
          ) : (
            <>
              <div className="auth-form__field">
                <label htmlFor="auth-email">Adresse e-mail</label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="votre@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-form__field">
                <label htmlFor="auth-username">Pseudonyme</label>
                <input
                  id="auth-username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Votre pseudonyme"
                  autoComplete="username"
                  required
                />
              </div>
            </>
          )}

          <div className="auth-form__field">
            <label htmlFor="auth-password">Mot de passe</label>
            <div className="auth-password-wrapper">
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Votre mot de passe"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
              />
              <button
                type="button"
                className="auth-password-toggle-button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword
                    ? "Cacher le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? "Cacher" : "Afficher"}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="auth-form__error" role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit" className="search-submit auth-form__submit">
            {mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Auth;
