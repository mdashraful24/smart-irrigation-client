import useAuth from "./useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth();

    const isAdmin = user?.email === "dbosma2025@gmail.com";

    return { isAdmin, loading };
};

export default useAdmin;
