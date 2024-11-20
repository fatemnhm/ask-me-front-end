import styles from './Dashboard.module.css';
 
const Dashboard = ({ user }) => {
  return (
    <main>
    <div className={styles.dashboardContainer}>
        <div className={styles.welcomeWindow}>
          <div className={styles.windowContent}>
            <h2>Welcome to Your Ask Me Dashboard {user.username} !</h2>
            <p>
            Welcome to our platform, where curiosity meets expertise! 
            Ask questions and get answers from professionals and enthusiasts across various fields, 
            including technology, health, education, and more ..
            </p>
            <p>Join our community to share knowledge, 
            explore ideas, and find solutions together ..
            </p>
          </div>
        </div>
    </div>
    </main>
  );
};

export default Dashboard;
