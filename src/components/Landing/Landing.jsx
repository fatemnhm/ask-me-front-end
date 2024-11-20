// src/components/Landing.jsx
import styles from './Landing.module.css';


const Landing = () => {
  return (
    <main className={styles.container}>
      <h1>Hello, you are on the landing page for visitors.</h1>
      <article>
      <p>
        If you sign up for a new account, you will have the ability to sign in
        and see your super secret dashboard.
      </p>
      </article>
    </main>
  );
};

export default Landing;