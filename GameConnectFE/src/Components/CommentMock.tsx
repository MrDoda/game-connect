import { createSignal, For } from 'solid-js'

export const CommentMock = () => {
  const [comment, setComment] = createSignal('')
  const [comments, setComments] = createSignal<any[]>([])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setComments([...comments(), { id: Date.now(), text: comment() }])
    setComment('') // Reset comment input after submission
  }

  const gravatarUrl = `https://www.gravatar.com/avatar/tewqwe?s=64&d=retro`

  return (
    <div class="container">
      {/* Mocked Post Section */}
      <div class="box">
        <h2 class="title is-4">Lorem Ipsum Post</h2>
        <p>
          Aenean vestibulum imperdiet ultricies sapien varius. Ultrices ut; arcu
          aliquet rhoncus. Urna tortor senectus justo aenean hac tristique
          curae;. At lectus aenean et aliquet laoreet cubilia ornare fermentum
          vel fringilla mus class. Faucibus nisl cursus semper dignissim
          porttitor penatibus. Dis facilisis sociosqu porta class dui ridiculus
          vestibulum porta turpis ultrices. Diam lectus phasellus phasellus
          quisque imperdiet molestie interdum vehicula. Mi class in erat
          facilisis!
        </p>
        <p>
          Tristique felis torquent hac platea in vehicula malesuada odio
          sollicitudin dignissim. Tristique class aliquet pretium pulvinar
          sociis integer magna senectus justo augue egestas! Eget porttitor
          semper consectetur. Nullam ac senectus velit purus accumsan laoreet
          non sapien dignissim! Aptent malesuada tortor consequat. Mollis magnis
          velit suscipit aliquet in. Magnis eget integer felis.
        </p>
        <p>
          Enim tellus in commodo felis fames ultricies feugiat et et! Orci
          aliquet varius porta dictum nisl mollis amet blandit fames imperdiet.
          Porttitor nostra accumsan feugiat dis nec dapibus nisl erat? Sociis
          tellus tristique nec interdum turpis, mus natoque donec tincidunt est
          placerat hendrerit. Vulputate sagittis ligula nulla primis. Malesuada
          amet enim posuere, lacus fermentum nullam euismod scelerisque class
          curae; consectetur ipsum. Penatibus, ut maecenas magnis nunc. Arcu
          tellus conubia vivamus dui placerat etiam nunc potenti non sociosqu ad
          dictum. Molestie eu urna consectetur nam felis inceptos curae; iaculis
          vitae molestie sollicitudin. Conubia.
        </p>
        <p>
          Aliquam dictum sapien molestie habitasse elementum. Lobortis conubia
          senectus massa massa dolor congue placerat eros quam fusce quisque.
          Neque sollicitudin sed tristique nullam vitae sociosqu nascetur
          tristique bibendum dui? Augue convallis sociis natoque. Dapibus amet
          hendrerit non pretium eleifend vivamus lorem maecenas quam. Quisque,
          sollicitudin maecenas cras quisque. Commodo praesent magnis adipiscing
          scelerisque inceptos convallis euismod. Consequat bibendum eros
          rhoncus nec mi lectus nunc dis velit facilisis. Feugiat turpis, hac
          nulla per non ultricies dis turpis netus? Bibendum facilisis blandit.
        </p>
        <p>
          Nulla augue himenaeos aliquam proin platea integer risus velit. Quam
          sapien accumsan nibh himenaeos natoque elit netus scelerisque fames
          arcu mus! Nostra in nulla nascetur sagittis id tincidunt aliquam
          rutrum pellentesque dis ante etiam! Litora orci sagittis id morbi eget
          sociosqu cursus massa neque morbi felis. Sem bibendum bibendum montes,
          mattis curabitur mollis class justo. Urna mi feugiat aliquam montes
          lacus facilisis leo praesent fames vehicula.
        </p>
      </div>

      {/* Display Submitted Comments */}
      <div class="box">
        <For each={comments()}>
          {(comment) => (
            <div class="box">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img src={gravatarUrl} />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>John Smith</strong> <small>@johnsmith</small>{' '}
                      <small>31m</small>
                      <br />
                      {comment.text}
                    </p>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-left">
                      <a class="level-item">
                        <span class="icon is-small">
                          <i class="fas fa-reply"></i>
                        </span>
                      </a>
                      <a class="level-item">
                        <span class="icon is-small">
                          <i class="fas fa-retweet"></i>
                        </span>
                      </a>
                      <a class="level-item">
                        <span class="icon is-small">
                          <i class="fas fa-heart"></i>
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
                <div class="media-right">
                  <button class="delete"></button>
                </div>
              </article>
            </div>
          )}
        </For>
      </div>

      <div class="box">
        <form onSubmit={handleSubmit}>
          <div class="field">
            <label class="label" for="comment">
              Your Comment
            </label>
            <div class="control">
              <textarea
                class="textarea"
                id="comment"
                placeholder="Add a comment..."
                value={comment()}
                onInput={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">
                <span class="icon">
                  <i class="fas fa-paper-plane"></i>
                </span>
                <span>Send</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
