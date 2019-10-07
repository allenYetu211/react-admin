/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/**
 * @file:    新建文章内容 、 编辑文章
 * @author:  Allen OYang https://github.com/allenYetu211
 */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import ContentHeaderComponent from 'globals/components/contentHeader';
import CardContainerComponent from 'globals/components/cardContainer';
import MarkDownComponent from 'globals/components/markdown';
import TagsComponent from 'globals/components/tags';
import {
	putEditArticle,
	postCreateArticle,
	getArticleDetail,
	getTagsAll,
} from 'globals/action/httpaction';

import { Checkbox } from 'antd';

import { observer, inject } from 'mobx-react';
import { ITags, IArticle } from 'globals/interfaces/interface';
import style from './style/style.scss';

interface IState {
	title: string;
	introduce: string;
	tags: ITags[];
	selected: number[];
	markedContent: string;
	content: string;
	isEdit: boolean;
	articleId: number;
	checked: boolean;
}

const ArticleCreateOrDetailPage = (props: any) => {
	const [title, setTitle] = useState<string>('');
	const [introduce, setIntroduce] = useState<string>('');
	const [markedContent, setMarkedContent] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [tags, setTags] = useState<ITags[]>([]);
	const [selected, setSelected] = useState<number[]>([]);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [checked, setChecked] = useState<boolean>(false);
	const [articleId, setArticleId] = useState<number>(0);

	// 初始编辑信息
	const initHandleEditeArticle = (
		data: IArticle,
		id: number,
		tagResult: any,
	) => {
		console.log('tags::', tagResult);
		const tSelected: number[] = [];
		tagResult.forEach((item: any, index: number) => {
			if (data.tags.includes(item.msg)) {
				tSelected.push(index);
			}
		});

		console.log('tSelected', tSelected);

		setTitle(data.title);
		setIntroduce(data.introduce);
		setContent(data.content);
		setMarkedContent(data.content);
		setSelected(tSelected);
		setArticleId(id);
		setChecked(data.publishState);
		setIsEdit(true);
	};

	//  获取详情
	const initGetArticleDetail = async (id: number, tagResult: any) => {
		const articleResult = await getArticleDetail(id);
		initHandleEditeArticle(articleResult, id, tagResult);
	};

	// 获取全部标签
	const initArticle = async () => {
		const tagResult: any = await getTagsAll();
		setTags(tagResult);
		const { pathname } = props.location;
		if (/ArticleDetail/.test(pathname)) {
			const id = pathname.replace(/\/ArticleDetail\/(.\w)/g, '$1');
			if (id) {
				await initGetArticleDetail(id, tagResult);
			}
		}
	};

	// 处理标题
	const onTitle = (e: any): void => {
		setTitle(e.target.value);
		// this.setState({ title: e.target.value });
	};

	// 处理简介
	const onBriefintroduce = (e: any) => {
		setIntroduce(e.target.value);
		// this.setState({ introduce: e.target.value });
	};

	// 处理tags
	const onChangeSelected = (selecteds: number[]) => {
		setSelected(selecteds);
		// this.setState({ selected: selecteds });
	};

	// 处理marked 内容
	const onChangeMarkedContent = (value: string) => {
		setContent(content);
		// this.setState({ content });
	};

	// 处理文章公布状态公用数据
	const onPublishState = (e: any) => {
		setChecked(e.target.checked);
		// this.setState({ checked: e.target.checked });
	};

	// 处理内容内容
	const onSaveSubmit = async () => {
		const resultTags = selected.map((item: number) => tags[item].msg);

		const submitData = {
			title,
			tags: resultTags,
			introduce,
			content,
			publishState: checked,
			isEdit: true,
		};

		try {
			if (isEdit) {
				await putEditArticle(submitData, articleId);
			} else {
				await postCreateArticle(submitData);
			}
			props.history.push('/ArticleAll');
		} catch (e) {
			console.log('创建文章存储失败::', e);
		}
	};

	useEffect(() => {
		initArticle();
	}, []);

	return (
		<div>
			<ContentHeaderComponent title={isEdit ? '编辑文章' : '新建文章'}>
				<button type="button" onClick={onSaveSubmit}>
					保存
				</button>
			</ContentHeaderComponent>

			<div className={style.articleContainer}>
				<div className={style.editContainer}>
					<CardContainerComponent fullHv cardTitlt="基本信息">
						<div className={style.basicsInfoContainer}>
							<div>
								<div className={style.labelItem}>
									<span>文章标题</span>
									<input
										className="default__style"
										value={title}
										onChange={onTitle}
										type="text"
									/>
								</div>

								<div className={style.labelItemStart}>
									<span>文章简介</span>
									<textarea
										className="default__style textarea__style"
										value={introduce}
										onChange={onBriefintroduce}
									/>
								</div>

								<div className={style.labelItem}>
									<span>文章标签</span>
									<TagsComponent
										onChangeSelected={onChangeSelected}
										selected={selected}
										tags={tags}
									/>
								</div>
							</div>
							<div>
								<div className={style.labelItemStart}>
									<span>文章内容</span>
									<div className={style.itemContainer}>
										<MarkDownComponent
											markedContent={markedContent}
											onChangeMarkedContent={onChangeMarkedContent}
										/>
									</div>
								</div>
							</div>
						</div>
					</CardContainerComponent>
				</div>

				<div className={style.stateContainer}>
					<CardContainerComponent cardTitlt="发布状态">
						<Checkbox checked={checked} onChange={onPublishState}>
							公布
						</Checkbox>
					</CardContainerComponent>
				</div>
			</div>
		</div>
	);
};

export default ArticleCreateOrDetailPage;
