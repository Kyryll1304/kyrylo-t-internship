import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getUserById } from "../../lib/api";
import { User } from "../../types";
import styles from "@/styles/UserPage.module.css";

interface UserPageProps {
  user: User;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <div className={styles.userProfile}>
          <img
            className={styles.userImage}
            src={user.image}
            alt={user.firstName}
          />
          <div className={styles.userInfo}>
            <h1 className={styles.pageTitle}>User Details</h1>
            <div className={styles.info}>
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              {/* Сюди можна кинути інші деталі юзера */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params;
  const user = await getUserById(Number(id));

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default UserPage;
