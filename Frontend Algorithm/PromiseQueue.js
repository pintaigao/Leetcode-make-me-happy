function PromiseQueue() {
  let currentOperation = Promise.resolve();

  this.enqueueOperation = async (operation) => {
    let previousOperation = currentOperation
    let releaseOperations;
    currentOperation = new Promise((resolve) => {
      releaseOperations = resolve;
    });

    await previousOperation;

    try {
      return await operation();
    } finally {
      releaseOperations()
    }
  }
}

let queue = new PromiseQueue();
queue.enqueueOperation(() => console.log("1"))
queue.enqueueOperation(() => console.log("2"))
queue.enqueueOperation(() => console.log("3"))