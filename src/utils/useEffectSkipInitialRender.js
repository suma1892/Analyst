/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
const useEffectSkipInitialRender = (callback, dataArr) => {
  const [data, setData] = useState(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    return callback();
  }, dataArr);
};

export default useEffectSkipInitialRender;
