export const CreateNewPost = () => {
  return (
    <section class="box">
      <h1 class="title">Create new Post</h1>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            class="input is-info"
            type="text"
            placeholder="Your Title goes here"
          />
        </div>
      </div>
      <div class="box">
        <div class="field">
          <label class="label">Generate Content with help of AI</label>
          <div class="control">
            <textarea
              class="textarea is-success"
              placeholder="Your prompt. Describe what your content should be about."
            ></textarea>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button pl-5 is-success">
              <span class="icon pl-2 pr-5">
                <i class="fa-solid fa-robot"></i>
              </span>
              Generate Content
            </button>
          </div>
        </div>
      </div>

      <p>
        There is your HTML representation of your website. Or you can switch it
        to preview mode.
      </p>
      <div class="tabs">
        <ul>
          <li class="is-active">
            <a>HTML Mode</a>
          </li>
          <li>
            <a>Preview Mode</a>
          </li>
        </ul>
      </div>
      <div class="field">
        <div class="control">
          <textarea
            class="textarea is-large"
            placeholder="Your web content goes here"
            rows="10"
          ></textarea>
        </div>
      </div>
      <button class="button pl-5 is-primary">
        <span class="icon pl-2 pr-5">
          <i class="fa-solid fa-floppy-disk"></i>
        </span>
        Publish
      </button>
    </section>
  )
}
