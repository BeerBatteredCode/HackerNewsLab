import React, { Component } from 'react';
import StoryDetail from '../components/StoryDetail';
import StorySelector from '../components/StorySelector';
import CommentList from '../components/CommentList'

class StoryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            selectedStory: null
        };
        this.selectStory = this.selectStory.bind(this);
    }

    componentDidMount() {
        const url = "http://hacker-news.firebaseio.com/v0/topstories.json";
        fetch(url)
            .then(res => res.json())
            .then((stories) => {
                const latestStories = stories.slice(0, 20)
                const promises = latestStories.map((id) => {
                    return fetch(`http://hacker-news.firebaseio.com/v0/item/${id}.json`)
                        .then(res => res.json())
                });
                Promise.all(promises)
                    .then(storyObjects => {
                        this.setState({ stories: storyObjects })
                    })
            })

    }

    selectStory(selectedIndex) {
        const selectedStory = this.state.stories[selectedIndex];
        this.setState({ selectedStory })

    }

    render() {

        const commentList = this.state.comments ? <CommentList comments={this.state.comments} /> : null
        return (
            <div className='wrapper'>
                <div className='story-container'>
                    <h1>Hacker News</h1>
                    <StorySelector
                        stories={this.state.stories}
                        onStorySelected={this.selectStory}
                    />
                </div>
                <StoryDetail story={this.state.selectedStory} />

                {commentList}
            </div>
        )
    }
}

export default StoryContainer;