import { createPortal } from "react-dom";

export default function LoadingPortal({ isLoading }) {
  if (!isLoading) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #ddd",
            borderTop: "4px solid #4f46e5",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 20px",
          }}
        />
        <p style={{ fontSize: "16px", color: "#333", margin: 0 }}>
          Cargando…
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
}