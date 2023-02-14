mergeInto(LibraryManager.library, {
  GameOver: function (resultados) {
    window.dispatchReactUnityEvent(
      "GameOver",
      Pointer_stringify(resultados)
    );
  },
});