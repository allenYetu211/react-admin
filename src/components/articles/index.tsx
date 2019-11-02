/* eslint-disable no-underscore-dangle */
/**
 * @file:
 * @module:  文章渲染
 * @author:  Allen OYang https://github.com/allenYetu211
 */

import React from 'react';
import { IArticle } from 'globals/interfaces/interface';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import dayjs from 'dayjs';
import style from './style/style.scss';

interface IProps {
	article: IArticle[];
}

const ArticleContainer = (props: IProps) => {
	return (
		<div className={style.articleContainer}>
			{props.article.map((item: IArticle, key: number) => {
				console.log('item.createTime', item.createTime);
				const skipPath = `/ArticleDetail/${item._id}`;
				return (
					<Card
						title={<Link to={skipPath}>{item.title}</Link>}
						extra={
							<>
								创建时间：{dayjs(item.createTime).format('YYYY-MM-DD hh:mm:ss')}
							</>
						}>
						<div className={style.articleIntroduce}>{item.introduce}</div>
					</Card>
				);
			})}
		</div>
	);
};

export default ArticleContainer;
