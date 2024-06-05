import { FC } from "react";

interface Props {
  error: any;
  resetErrorBoundary: () => void;
}

const FallbackRender: FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="fallback">
      <h2 style={{ marginBottom: "1rem" }}>Uh Oh. Something went wrong :(</h2>
      <pre className="fallback">{error.message}</pre>
      <p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => resetErrorBoundary()}
        >
          Retry render
        </button>
      </p>
      <p>
        If this error persists after pressing retry, message me (indoc.) on
        Discord or <a href="mailto:indoc.dev0@gmail.com">send me an email</a>
      </p>
    </div>
  );
};

export default FallbackRender;
